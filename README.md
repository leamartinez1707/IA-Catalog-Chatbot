# 🛍️ ShopSmart AI - E-commerce con Asistente IA

> **E-commerce completo con chatbot IA integrado**  
> Next.js 15 + TypeScript + Tailwind CSS + OpenAI API

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

## 🎯 Características Principales

- **🤖 Asistente AI**: Chatbot conversacional para recomendaciones de productos
- **🛒 E-commerce Completo**: Catálogo, carrito, favoritos y checkout
- **🔍 Búsqueda Inteligente**: Filtrado en tiempo real
- **📱 Diseño Responsivo**: Mobile-first con shadcn/ui
- **⚡ Alto Rendimiento**: Server Components y optimizaciones

## 🛠️ Stack Tecnológico

**Frontend**: Next.js 15 • TypeScript • Tailwind CSS • shadcn/ui  
**Estado**: Zustand • TanStack Query  
**AI**: OpenAI API con streaming  
**Herramientas**: ESLint • Prettier

## 🚀 Inicio Rápido

```bash
# Clonar e instalar
git clone https://github.com/tu-usuario/shopsmart-ai.git
cd shopsmart-ai && npm install

# Configurar variables de entorno
cp .env.example .env.local
# Agregar OPENAI_API_KEY

# Ejecutar
npm run dev
```

## 📁 Arquitectura

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── api/chat/          # Endpoint del chatbot AI
│   ├── checkout/          # Página de checkout
│   ├── favorites/         # Página de favoritos
│   └── product/[id]/      # Páginas dinámicas
├── components/            # Componentes reutilizables
│   ├── cart/             # Carrito de compras
│   ├── checkout/         # Formularios checkout
│   ├── client/           # Componentes cliente
│   ├── products/         # Catálogo productos
│   └── ui/               # Componentes shadcn/ui
├── hooks/                # Custom hooks
├── store/                # Estado global (Zustand)
├── types/                # Definiciones TypeScript
└── utils/                # Funciones utilitarias
```

## 💡 Decisiones Técnicas

- **Next.js App Router**: SSR + Server Components
- **Zustand**: Estado global simple y eficiente
- **TanStack Query**: Cache inteligente de datos
- **shadcn/ui**: Sistema de componentes consistente
- **TypeScript estricto**: Máxima seguridad de tipos

## 🚀 Deploy

```bash
# Vercel (recomendado)
npm install -g vercel
vercel --prod

# Variables de entorno necesarias
OPENAI_API_KEY=tu_api_key_aqui
SUPABASE_URL=url_supabase
SUPABASE_ANON_KEY=supabase_key
```

## 👨‍💻 Habilidades Demostradas

- ⚛️ React 19 + Next.js 15 con App Router
- 🔷 TypeScript avanzado con interfaces personalizadas
- 🎨 CSS moderno con Tailwind + componentes reutilizables
- 🔄 Gestión de estado eficiente (Zustand + TanStack Query)
- 🤖 Integración AI con streaming responses
- 📱 Desarrollo responsive mobile-first
- 🔧 Tooling profesional y mejores prácticas

## 🤝 Contacto

¿Interesado en mi trabajo? ¡Hablemos!

- 📧 **Email**: [leandromartinez@gmail.com](mailto:leandromartinez.dev@gmail.com)
- 💼 **LinkedIn**: [@leandromartinezuy](https://www.linkedin.com/in/leandromartinezuy/)
- 🐙 **GitHub**: [@leamartinez1707](https://github.com/leamartinez1707)

---

⭐ **Si este proyecto te resulta útil, no olvides darle una estrella**
