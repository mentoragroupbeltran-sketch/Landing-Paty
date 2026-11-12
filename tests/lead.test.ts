import { describe, expect, it, beforeEach } from "vitest";
import { escapeFormula, normalizePhone, validateCity, validateName, cleanText } from "@/lib/fields";
import { buildLead, deriveOrigin, leadIdFrom, LeadRequestSchema } from "@/lib/lead";
import { rateLimit, _resetRateLimit } from "@/lib/rate-limit";
import { signPayload } from "@/lib/sheets";

const base = {
  submission_id: "2f1c7c1e-9a51-4f3e-8a1b-0c5d6e7f8a9b",
  nombre: "María López",
  whatsapp: "987 654 321",
  ciudad: "Arequipa",
  consent: true as const,
  attribution: {},
};

describe("teléfono", () => {
  it.each([
    ["987654321", "+51987654321"],
    ["987 654 321", "+51987654321"],
    ["+51 987-654-321", "+51987654321"],
    ["51987654321", "+51987654321"],
    ["+593 99 123 4567", "+593991234567"],
  ])("%s → %s", (input, out) => expect(normalizePhone(input)).toBe(out));

  it.each(["12345", "887654321", "+51 887654321", "abc987654321", "=1+1", "593991234567"])(
    "rechaza %s",
    (input) => expect(normalizePhone(input)).toBeNull(),
  );
});

describe("nombre y ciudad", () => {
  it("acepta tildes, ñ y apóstrofos", () => {
    expect(validateName("José Ñúñez O'Connor")).toBeNull();
    expect(validateCity("Cerro de Pasco")).toBeNull();
  });
  it("rechaza fórmulas y HTML", () => {
    expect(validateName("=HYPERLINK(\"http://x\")")).not.toBeNull();
    expect(validateCity("@SUM(A1)")).not.toBeNull();
    expect(cleanText("<script>a</script>")).not.toContain("<");
  });
  it("elimina caracteres invisibles", () => {
    expect(cleanText("Ana\u0000​  Pérez ")).toBe("Ana Pérez");
  });
});

describe("anti-inyección de fórmulas", () => {
  it.each(["=1+1", "+51999", "-2", "@x", "\tx"])("escapa %j", (v) => expect(escapeFormula(v).startsWith("'")).toBe(true));
  it("no toca texto normal", () => expect(escapeFormula("Lima")).toBe("Lima"));
});

describe("buildLead", () => {
  it("construye el registro con estado NUEVO y consentimiento", () => {
    const r = buildLead(LeadRequestSchema.parse(base), new Date("2026-11-12T20:00:00Z"));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.lead.whatsapp).toBe("+51987654321");
    expect(r.lead.estado).toBe("NUEVO");
    expect(r.lead.consentimiento).toBe("SÍ");
    expect(r.lead.origen).toBe("Directo");
    expect(r.lead.campana).toBe("(sin campaña)");
    expect(r.lead.lead_id).toMatch(/^MEN-[0-9A-F]{10}$/);
  });

  it("el mismo submission_id genera el mismo lead_id (reintentos sin duplicar)", () => {
    expect(leadIdFrom(base.submission_id)).toBe(leadIdFrom(base.submission_id));
    expect(leadIdFrom(base.submission_id)).not.toBe(leadIdFrom("00000000-0000-4000-8000-000000000000"));
  });

  it("escapa UTMs maliciosos", () => {
    const r = buildLead(LeadRequestSchema.parse({ ...base, attribution: { utm_campaign: "=IMPORTXML(\"x\")" } }));
    expect(r.ok && r.lead.utm_campaign.startsWith("'=")).toBe(true);
  });

  it("devuelve errores por campo", () => {
    const r = buildLead(LeadRequestSchema.parse({ ...base, whatsapp: "123", nombre: "A" }));
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.fields.whatsapp).toBeTruthy();
    expect(r.fields.nombre).toBeTruthy();
  });

  it("exige consentimiento = true", () => {
    expect(LeadRequestSchema.safeParse({ ...base, consent: false }).success).toBe(false);
  });
});

describe("origen", () => {
  it.each([
    [{ utm_source: "facebook" }, "Meta Ads"],
    [{ utm_source: "ig" }, "Meta Ads"],
    [{ utm_source: "tiktok" }, "TikTok Ads"],
    [{ has_fbclid: true }, "Meta (sin UTM)"],
    [{ has_ttclid: true }, "TikTok (sin UTM)"],
    [{ referrer_host: "l.instagram.com" }, "Meta orgánico"],
    [{}, "Directo"],
  ])("%j → %s", (a, out) => expect(deriveOrigin(a)).toBe(out));
});

describe("rate limit", () => {
  beforeEach(() => _resetRateLimit());
  it("bloquea el 6.º intento en la ventana", () => {
    for (let i = 0; i < 5; i++) expect(rateLimit("ip:1", { limit: 5, windowMs: 60000 }, 1000 + i).allowed).toBe(true);
    expect(rateLimit("ip:1", { limit: 5, windowMs: 60000 }, 2000).allowed).toBe(false);
    expect(rateLimit("ip:1", { limit: 5, windowMs: 60000 }, 70000).allowed).toBe(true);
  });
});

describe("firma HMAC", () => {
  it("es determinística y cambia con el contenido", () => {
    const s = "x".repeat(64);
    expect(signPayload("a", 1, s)).toBe(signPayload("a", 1, s));
    expect(signPayload("a", 1, s)).not.toBe(signPayload("b", 1, s));
    expect(signPayload("a", 1, s)).toMatch(/^[0-9a-f]{64}$/);
  });
});
