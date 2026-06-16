# Calculadora de Precios

SPA en React + Vite para fijar el precio de servicios y productos a partir de costes y otras variables.

## Fuente de verdad

El fichero [`docs/Calculadora_Precios servicios-productos.xlsx`](docs/Calculadora_Precios%20servicios-productos.xlsx) es el **documento funcional**: define la lógica de cálculo y cómo se aplica. **No se ejecuta** en la app; sirve de especificación. Si el Excel cambia, hay que actualizar el código en consecuencia (motor de cálculo y configuración de campos).

## Cómo funciona

1. La app pregunta primero **qué tipo de servicio/producto** se va a calcular (una pestaña del Excel = una calculadora).
2. Muestra un **formulario interactivo** con todos los campos opcionales.
3. Un **panel de resultado fijo** recalcula el precio en vivo a medida que se rellenan los datos.
4. Un botón **"Descargar informe en PDF"** genera un informe completo del cálculo (datos del negocio, precio final, desglose, costes y análisis de rentabilidad).
5. Los valores introducidos se **guardan en `localStorage`** (por calculadora) y se recuperan automáticamente la próxima vez que se abre.

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

La configuración global (IVA, moneda) está en `src/config/global.js` (pestaña 🏠 Portada del Excel). Los **costes indirectos** (estructura mensual: nóminas, alquiler, seguros, etc. y horas facturables totales/mes) también viven en los datos del negocio (`BUSINESS_INDIRECT_FIELDS`), porque son comunes a todas las calculadoras; se editan en la pantalla "Datos de tu negocio" y `compute(values, business)` los lee desde `business`. Las **horas dedicadas al proyecto** (`horasProyecto`) siguen siendo específicas de cada cálculo y se mantienen en la calculadora (sección B).

### Persistencia

`src/lib/storage.js` ofrece `loadJSON`/`saveJSON` (tolerantes a fallos). En `App.jsx` se persisten los datos del negocio (`calc.business`) y los valores de cada calculadora (`calc.values.<id>`); al abrir una calculadora se fusionan los valores guardados con los defaults. "Restablecer valores" sobrescribe lo guardado con los valores por defecto.

### Exportación a PDF

`src/lib/pdf.js` exporta `exportResultPdf(result, business, calculator)`, que construye el informe con **jsPDF** a partir de los datos estructurados (no es una captura: el texto es seleccionable y usa la paleta de marca). jsPDF se carga de forma **diferida** (`import()` dinámico dentro de la función) para no engordar el bundle inicial; solo se descarga al pulsar el botón. El botón vive en `ResultPanel.jsx`.

## Acceso (protección por contraseña)

La app está protegida con **HTTP Basic Auth multiusuario** mediante un Routing Middleware de Vercel (`middleware.js` en la raíz). El navegador pide usuario/contraseña antes de cargar nada y las credenciales se validan en el edge, **no viajan en el bundle**.

Los usuarios se configuran en una única variable de entorno en Vercel (Project → Settings → Environment Variables):

- `BASIC_AUTH_USERS` — pares `usuario:contraseña` separados por coma.
  Ejemplo: `ruben:clave1,diana:clave2,maria:clave3`

Para dar de alta o baja un usuario basta con editar esa variable y volver a desplegar; no hay que tocar código. Si la variable no está definida, el middleware **no bloquea** (evita dejar la app inaccesible por error). Para probar en local con `vercel dev`, copia `.env.example` a `.env`.

> Nota: esto protege a nivel de servidor y permite varios usuarios, pero es una **lista de credenciales compartida que administras a mano** (sin registro, reset de contraseña, roles ni sesiones individuales). La contraseña no puede contener comas. Para gestión de cuentas real haría falta un backend de auth (Supabase, Auth0, Clerk…).

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

> Tras añadir `jspdf` a `package.json`, ejecuta `pnpm install` para que pnpm
> enlace la dependencia y actualice `pnpm-lock.yaml`.
