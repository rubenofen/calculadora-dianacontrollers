import { next } from '@vercel/functions'

// =============================================================================
// PROTECCIÓN POR CONTRASEÑA — HTTP Basic Auth multiusuario en el edge de Vercel.
// Las credenciales NO viajan en el bundle: se leen de una variable de entorno
// configurada en el panel de Vercel.
//
// Variable: BASIC_AUTH_USERS
//   Lista de pares usuario:contraseña separados por coma (o salto de línea).
//   Ejemplo:  ruben:clave1,diana:clave2,maria:clave3
//   La contraseña puede contener ":" (se parte por el primer ":"), pero NO
//   puede contener comas ni saltos de línea.
//
// Para dar de alta o baja un usuario basta con editar esa variable y redeployar.
// =============================================================================

export const config = {
  matcher: '/:path*',
}

// Parsea "user:pass,user2:pass2" en un Map { user => pass }.
function parseUsers(raw) {
  const map = new Map()
  if (!raw) return map
  for (const entry of raw.split(/[,\n]/)) {
    const trimmed = entry.trim()
    if (!trimmed) continue
    const sep = trimmed.indexOf(':')
    if (sep === -1) continue
    const user = trimmed.slice(0, sep).trim()
    const pass = trimmed.slice(sep + 1)
    if (user) map.set(user, pass)
  }
  return map
}

export default function middleware(request) {
  const users = parseUsers(process.env.BASIC_AUTH_USERS)

  // Sin usuarios configurados → no bloquea (evita dejar la app inaccesible
  // por un despiste de configuración).
  if (users.size === 0) return next()

  const header = request.headers.get('authorization') || ''
  const [scheme, encoded] = header.split(' ')

  if (scheme === 'Basic' && encoded) {
    const decoded = atob(encoded)
    const sep = decoded.indexOf(':')
    const user = decoded.slice(0, sep)
    const pass = decoded.slice(sep + 1)
    if (users.has(user) && users.get(user) === pass) return next()
  }

  return new Response('Acceso restringido', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Calculadora de Precios", charset="UTF-8"',
    },
  })
}
