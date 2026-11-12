# Landing Page - Paty Beltrán (Mentora Group Beltrán)

Landing page profesional y moderna desarrollada con Next.js (App Router), TypeScript y Tailwind CSS para **Paty Beltrán** (Mentora de Crecimiento & Liderazgo de Alto Impacto).

## 🚀 Tecnologías

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Calidad de Código:** ESLint

## 📁 Estructura del Proyecto

```text
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css      # Variables y estilos globales
│   ├── layout.tsx       # Estructura raíz y metadata SEO / OpenGraph
│   └── page.tsx         # Ensamblaje de secciones de la landing
├── components/
│   ├── navbar.tsx       # Barra de navegación fija con menú responsive
│   ├── hero.tsx         # Hero section de alto impacto con métricas y CTA
│   ├── about.tsx        # Sección de autoridad y biografía de la mentora
│   ├── benefits.tsx     # Pilares de la metodología
│   ├── services.tsx     # Tarjetas de programas (1:1 VIP, Equipos, Flash)
│   ├── testimonials.tsx # Prueba social y testimonios de clientes
│   ├── faq.tsx          # Acordeón de preguntas frecuentes
│   ├── cta-section.tsx  # Formulario interactivo de postulación / diagnóstico
│   └── footer.tsx       # Enlaces de navegación, redes sociales y contacto
└── lib/
    └── utils.ts         # Función utilitaria para clases CSS (cn)
```

## 🛠️ Comandos Disponibles

### Servidor de Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Compilar para Producción
```bash
npm run build
```

### Iniciar Servidor de Producción
```bash
npm run start
```

### Ejecutar Linter
```bash
npm run lint
```
