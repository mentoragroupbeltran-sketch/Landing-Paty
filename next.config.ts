import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Política de seguridad de contenido (CSP).
 * Solo permite los dominios estrictamente necesarios:
 * YouTube (video), Meta/TikTok (pixels, si se activan), Cloudflare (Turnstile, si se activa).
 * Si alojas el MP4 en otro servicio, ya está permitido (media-src https:).
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://connect.facebook.net https://analytics.tiktok.com https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://i.ytimg.com https://www.facebook.com https://*.tiktok.com https://*.tiktokcdn.com",
  "font-src 'self'",
  "media-src 'self' https: blob:",
  "connect-src 'self' https://*.facebook.com https://*.facebook.net https://*.tiktok.com https://*.tiktokw.us https://challenges.cloudflare.com",
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
