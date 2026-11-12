import type { Metadata } from "next";
import { CONSENT_VERSION, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad | Mentora",
  robots: { index: false, follow: false },
};

/**
 * ⚠️ BORRADOR — NO ES TEXTO LEGAL DEFINITIVO.
 * Debe ser revisado por asesoría legal y aprobado por Isamar antes de publicar campañas.
 * Los campos entre [CORCHETES] deben completarse con datos reales de la empresa.
 * Si cambias el texto, actualiza CONSENT_VERSION en lib/site.ts.
 */

function Pending({ children }: { children: React.ReactNode }) {
  return <mark className="rounded bg-[#E5F298] px-1 text-oxford">{children}</mark>;
}

export default function Privacidad() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10 text-columbia sm:py-14">
      <a href="/" className="text-sm text-tiffany underline underline-offset-2">
        ← Volver
      </a>

      <div className="mt-6 rounded-xl border border-[#E5F298]/50 bg-[#E5F298]/10 p-4 text-sm text-white">
        <strong>BORRADOR PARA REVISIÓN LEGAL.</strong> Este texto aún no ha sido aprobado. Versión:{" "}
        {CONSENT_VERSION}.
      </div>

      <h1 className="font-display mt-6 text-3xl font-bold text-white sm:text-4xl">Política de Privacidad</h1>
      <p className="mt-2 text-sm text-columbia/70">Última actualización: <Pending>[FECHA DE APROBACIÓN]</Pending></p>

      <div className="mt-8 space-y-7 leading-relaxed [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_li]:mt-1 [&_ul]:list-disc [&_ul]:pl-5">
        <section>
          <h2>1. ¿Quién es responsable de tus datos?</h2>
          <p className="mt-2">
            {site.legalEntity} (“Mentora”), con RUC <Pending>[RUC]</Pending> y domicilio en{" "}
            <Pending>[DIRECCIÓN]</Pending>, es la titular del banco de datos personales de prospectos, inscrito
            ante la Autoridad Nacional de Protección de Datos Personales con el código{" "}
            <Pending>[N.º DE INSCRIPCIÓN DEL BANCO DE DATOS]</Pending>.
          </p>
        </section>

        <section>
          <h2>2. ¿Qué datos recopilamos?</h2>
          <ul className="mt-2">
            <li>Nombre completo.</li>
            <li>Número de WhatsApp.</li>
            <li>Ciudad.</li>
            <li>
              Datos de la campaña publicitaria por la que llegaste (parámetros UTM, como la fuente y el nombre
              de la campaña). No identifican a la persona por sí solos.
            </li>
            <li>Fecha, hora y versión del consentimiento que otorgaste.</li>
          </ul>
          <p className="mt-2">No recopilamos datos sensibles ni guardamos tu dirección IP en nuestra base de prospectos.</p>
        </section>

        <section>
          <h2>3. ¿Para qué usamos tus datos?</h2>
          <p className="mt-2">
            Únicamente para contactarte por WhatsApp o llamada telefónica y brindarte información sobre los
            programas de inglés de Mentora que solicitaste, y para medir qué campañas publicitarias funcionan
            mejor de forma agregada. <Pending>[CONFIRMAR SI SE USARÁN PARA OTRAS FINALIDADES; DE SER ASÍ, REQUIEREN CONSENTIMIENTO SEPARADO]</Pending>
          </p>
        </section>

        <section>
          <h2>4. Base legal y consentimiento</h2>
          <p className="mt-2">
            Tratamos tus datos sobre la base de tu consentimiento previo, libre, expreso, informado e inequívoco,
            conforme a la Ley N.º 29733, Ley de Protección de Datos Personales, y su Reglamento aprobado por
            Decreto Supremo N.º 016-2024-JUS. Puedes retirar tu consentimiento en cualquier momento.
          </p>
        </section>

        <section>
          <h2>5. ¿Con quién compartimos tus datos? (encargados y flujo transfronterizo)</h2>
          <p className="mt-2">
            No vendemos tus datos. Para operar este formulario utilizamos proveedores tecnológicos que actúan
            como encargados de tratamiento: Vercel Inc. (alojamiento del sitio) y Google LLC (Google Sheets,
            almacenamiento de registros). Sus servidores pueden encontrarse fuera del Perú, por lo que el
            tratamiento implica un flujo transfronterizo de datos personales hacia{" "}
            <Pending>[PAÍSES — p. ej. Estados Unidos]</Pending>, realizado con las garantías exigidas por la
            normativa. <Pending>[VALIDAR CON ASESORÍA LEGAL Y DECLARAR ANTE LA ANPD SI CORRESPONDE]</Pending>
          </p>
          <p className="mt-2">
            El acceso a tus datos dentro de Mentora está restringido al personal del área comercial que te
            atenderá.
          </p>
        </section>

        <section>
          <h2>6. ¿Por cuánto tiempo los conservamos?</h2>
          <p className="mt-2">
            Mientras sea necesario para atender tu solicitud y, como máximo,{" "}
            <Pending>[PLAZO — p. ej. 12 meses desde tu registro]</Pending>, salvo que te matricules (en cuyo caso
            aplicará la política de alumnos) o retires antes tu consentimiento.
          </p>
        </section>

        <section>
          <h2>7. Tus derechos</h2>
          <p className="mt-2">
            Puedes ejercer tus derechos de información, acceso, rectificación, cancelación, oposición y
            portabilidad, así como revocar tu consentimiento, escribiendo a{" "}
            <Pending>[CORREO DE PRIVACIDAD, p. ej. privacidad@mentora.pe]</Pending>. Responderemos dentro de los
            plazos legales. Si consideras que no atendimos tu solicitud, puedes acudir a la Autoridad Nacional
            de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos.
          </p>
        </section>

        <section id="cookies">
          <h2>8. Cookies y medición publicitaria</h2>
          <p className="mt-2">
            Esta página solo usa almacenamiento técnico de la sesión para recordar la campaña por la que llegaste.
            Si en el futuro activamos herramientas de medición de Meta (Facebook/Instagram) o TikTok, te
            pediremos tu autorización antes de activarlas, y nunca les enviaremos tu nombre, número ni ciudad.
          </p>
        </section>

        <section>
          <h2>9. Seguridad</h2>
          <p className="mt-2">
            Aplicamos medidas técnicas y organizativas para proteger tus datos: conexión cifrada (HTTPS), envío
            firmado entre nuestro servidor y la base de datos, acceso restringido a la hoja de registros y
            validación de la información recibida.
          </p>
        </section>

        <section>
          <h2>10. Menores de edad</h2>
          <p className="mt-2">
            Este formulario está dirigido a personas mayores de 18 años.{" "}
            <Pending>[DEFINIR PROCEDIMIENTO PARA MENORES: el tratamiento de datos de menores de 14 años requiere consentimiento de padres o tutores]</Pending>
          </p>
        </section>
      </div>
    </main>
  );
}
