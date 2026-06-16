// =============================================================================
// PERSISTENCIA EN localStorage — guarda y recupera valores entre sesiones.
// Tolerante a fallos: si localStorage no está disponible (modo privado, etc.)
// o el JSON está corrupto, devuelve el valor por defecto sin romper la app.
// =============================================================================

export function loadJSON(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function saveJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Sin almacenamiento disponible: se ignora silenciosamente.
  }
}
