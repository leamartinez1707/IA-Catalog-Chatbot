
# ShopSmart AI - Next.js Shopping Assistant

Una aplicación de tienda online con asistente de compras AI construida con Next.js 15, TypeScript y Tailwind CSS.

## Características

- 🤖 **Asistente AI de Compras**: Chat inteligente que ayuda a encontrar productos
- 🛒 **Carrito de Compras**: Funcionalidad completa de carrito con gestión de cantidad
- 🔍 **Búsqueda en Tiempo Real**: Filtrado instantáneo de productos
- 📱 **Diseño Responsivo**: Optimizado para todos los dispositivos
- 🎨 **UI Moderna**: Interfaces elegantes con componentes shadcn/ui
- ⚡ **Alto Rendimiento**: Construido con Next.js App Router
- 🔒 **TypeScript**: Completamente tipado para máxima seguridad

## Tecnologías Utilizadas

- **Next.js 15** - Framework de React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS utilitario
- **shadcn/ui** - Componentes UI elegantes
- **Radix UI** - Componentes primitivos accesibles
- **Lucide React** - Iconos SVG
- **TanStack Query** - Gestión de estado del servidor
- **Sonner** - Notificaciones toast

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd ai-shopping-nextjs
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter
- `npm run type-check` - Verifica los tipos de TypeScript

## Estructura del Proyecto

```
├── app/                   # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout raíz
│   └── page.tsx           # Página principal
├── components/            # Componentes reutilizables
│   ├── ui/                # Componentes base de UI
│   ├── chat-assistant.tsx
│   ├── product-catalog.tsx
│   ├── search-bar.tsx
│   └── shopping-cart.tsx
├── lib/                  # Utilidades
├── providers/            # Providers de contexto
├── types/                # Definiciones de tipos TypeScript
└── public/               # Archivos estáticos
```

## Características Principales

### Asistente AI de Compras
- Chat conversacional que entiende las necesidades del usuario
- Recomendaciones de productos basadas en preferencias
- Respuestas contextuales e inteligentes

### Catálogo de Productos
- Grid responsivo de productos
- Filtrado por categorías
- Sistema de favoritos
- Calificaciones y reseñas

### Carrito de Compras
- Gestión completa de cantidad
- Cálculo automático de totales e impuestos
- Interfaz intuitiva para agregar/remover productos

### Búsqueda Avanzada
- Búsqueda en tiempo real
- Filtrado por nombre, descripción y categoría
- Resultados instantáneos

## Personalización

### Agregar Nuevos Productos
Modifica el array `SAMPLE_PRODUCTS` en `components/product-catalog.tsx`:

```typescript
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Producto Nuevo",
    price: 99.99,
    category: "Categoría",
    rating: 4.5,
    image: "url-de-imagen",
    description: "Descripción del producto",
    features: ["Característica 1", "Característica 2"]
  },
  // ... más productos
];
```

### Modificar Respuestas del AI
Actualiza el objeto `SAMPLE_RESPONSES` en `components/chat-assistant.tsx` para personalizar las respuestas del asistente.

## Despliegue

Esta aplicación puede ser desplegada en cualquier plataforma que soporte Next.js:

- **Vercel** (recomendado)
- **Netlify**
- **Railway**
- **AWS**
- **Google Cloud**

Para desplegar en Vercel:
```bash
npm install -g vercel
vercel
```

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
