import { CURRENCY_LOCALE } from '../config/global.js'

export function formatCurrency(value, currency = 'EUR') {
  const n = Number.isFinite(value) ? value : 0
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: 'currency',
    currency: currency || 'EUR',
    maximumFractionDigits: 2,
  }).format(n)
}

export function formatPercent(fraction, digits = 1) {
  const n = Number.isFinite(fraction) ? fraction : 0
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: 'percent',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n)
}

export function formatNumber(value, digits = 2) {
  const n = Number.isFinite(value) ? value : 0
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(n)
}

// Convierte el valor de un input (string vacío incluido) en número seguro.
export function num(value, fallback = 0) {
  if (value === '' || value === null || value === undefined) return fallback
  const n = typeof value === 'number' ? value : parseFloat(value)
  return Number.isFinite(n) ? n : fallback
}
