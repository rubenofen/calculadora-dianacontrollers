# Calculadora de Precios

SPA en React + Vite para fijar el precio de servicios y productos a partir de costes y otras variables.

## Fuente de verdad

El fichero [`docs/Calculadora_Precios servicios-productos.xlsx`](docs/Calculadora_Precios%20servicios-productos.xlsx) es el **documento funcional**: define la lógica de cálculo y cómo se aplica. **No se ejecuta** en la app; sirve de especificación. Si el Excel cambia, hay que actualizar el código en consecuencia (motor de cálculo y configuración de campos).

## Cómo funciona

1. La app pregunta primero **qué tipo de servicio/producto** se va a calcular (una pestaña del Excel = una calculadora).
2. Muestra un **formulario interactivo** con todos los campos opcionales.
3. Un **panel de resultado fijo** recalcula el precio en vivo a medida que se rellenan los datos.

Fórmula de servicios: `Precio = (Coste Base ÷ (1−Margen)) × Factor Valor × Factor Posicionamiento + Prima Riesgo + IVA`.

## Estado

| Calculadora | Estado |
|---|---|
| 🤝 Consultoría | ✅ Implementada (patrón de referencia) |
| 📚 Formaciones | ⏳ Pendiente (misma estructura que Consultoría) |
| ⚙️ Ingeniería | ⏳ Pendiente (misma estructura, +1 coste directo) |
| 📦 Producto | ⏳ Pendiente (lógica distinta: coste unitario + margen comercial) |

## Arquitectura

Diseño *config-driven*. Cada calculadora vive en `src/calculators/<id>.js` y exporta:

- `sections`: secciones y campos del formulario (id, etiqueta, default, unidad, tipo).
- `defaultValues()`: valores iniciales.
- `compute(values, global)`: motor de cálculo puro (réplica de las fórmulas del Excel).

Para añadir una calculadora nueva: crear su módulo siguiendo `consultoria.js`, registrarlo en `src/calculators/index.js` y marcar `available: true` en `CALCULATOR_TYPES`.

La configuración global (IVA, moneda) está en `src/config/global.js` (pestaña 🏠 Portada del Excel).

## Desarrollo

Gestor de paquetes: **pnpm**.

```bash
pnpm install
pnpm dev      # servidor de desarrollo
pnpm build    # build de producción
pnpm preview  # previsualizar el build
```

> Nota: pnpm 10+ bloquea por defecto los scripts de build de dependencias. Los
> necesarios (`esbuild`, `@tailwindcss/oxide`) están autorizados en
> `pnpm-workspace.yaml`.
