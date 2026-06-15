import consultoria from './consultoria.js'

// Registro de calculadoras. Cada pestaña del Excel = una entrada aquí.
// Consultoría está implementada como patrón; las demás se añadirán replicando
// la estructura de consultoria.js (sections + compute).
export const CALCULATORS = [consultoria]

// Tipos mostrados en el selector. `available: false` => visible pero deshabilitado.
export const CALCULATOR_TYPES = [
  { id: 'formaciones', label: 'Formaciones', icon: '📚', tagline: 'Cursos, talleres y formaciones.', available: false },
  { id: 'consultoria', label: 'Consultoría', icon: '🤝', tagline: 'Consultoría estratégica y asesoramiento.', available: true },
  { id: 'ingenieria', label: 'Ingeniería', icon: '⚙️', tagline: 'Proyectos técnicos y desarrollo.', available: false },
  { id: 'producto', label: 'Producto', icon: '📦', tagline: 'Productos físicos o digitales con margen comercial.', available: false },
]

export function getCalculator(id) {
  return CALCULATORS.find((c) => c.id === id) || null
}
