import { CURRENCIES, BUSINESS_INDIRECT_FIELDS } from '../config/global.js'
import Field from './Field.jsx'

// Paso "DATOS DE TU NEGOCIO" (Portada del Excel). Se rellena tras elegir el
// tipo y se refleja en la calculadora. Moneda e IVA alimentan el cálculo.
export default function BusinessForm({ type, business, onChange, onContinue, onBack }) {
  const set = (k, v) => onChange({ ...business, [k]: v })

  const inputCls =
    'w-full rounded-lg border border-gris-claro bg-white px-3 py-2 text-sm text-marino outline-none focus:border-terracota focus:ring-2 focus:ring-terracota/20'

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 rounded-lg border border-gris-claro px-3 py-1.5 text-sm text-gris-medio hover:bg-gris-claro/40"
      >
        ← Cambiar tipo
      </button>

      <div className="rounded-2xl border border-gris-claro bg-white p-6 shadow-sm">
        <h1 className="text-lg font-bold text-marino">Datos de tu negocio</h1>
        <p className="mt-1 text-sm text-gris-medio">
          {type?.icon} {type?.label} · Estos datos se mostrarán en la calculadora. Todos son opcionales.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gris-medio">Nombre del negocio / freelancer</span>
            <input
              className={inputCls}
              value={business.negocio}
              placeholder="Tu Nombre o Empresa"
              onChange={(e) => set('negocio', e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gris-medio">Sector</span>
            <input
              className={inputCls}
              value={business.sector}
              placeholder="Ej: Consultoría, Formación, Ingeniería…"
              onChange={(e) => set('sector', e.target.value)}
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gris-medio">Moneda</span>
              <select className={inputCls} value={business.currency} onChange={(e) => set('currency', e.target.value)}>
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm text-gris-medio">IVA general aplicable (%)</span>
              <input
                type="number"
                inputMode="decimal"
                className={inputCls}
                value={business.ivaPct}
                onChange={(e) => set('ivaPct', e.target.value)}
              />
            </label>
          </div>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gris-medio">Fecha de actualización</span>
            <input
              type="date"
              className={inputCls}
              value={business.fecha}
              onChange={(e) => set('fecha', e.target.value)}
            />
          </label>
        </div>

        {/* Costes indirectos (estructura mensual) — comunes a todas las calculadoras */}
        <div className="mt-6 border-t border-gris-claro/60 pt-4">
          <h2 className="text-sm font-semibold text-marino">Costes indirectos (estructura mensual)</h2>
          <p className="mt-1 text-xs text-gris-medio">
            Gastos fijos del negocio. Se prorratean entre las horas facturables y se aplican a todas las calculadoras.
          </p>
          <div className="mt-1 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
            {BUSINESS_INDIRECT_FIELDS.map((f) => (
              <Field key={f.id} field={f} value={business[f.id] ?? ''} onChange={(id, val) => set(id, val)} />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="mt-6 w-full rounded-lg bg-terracota px-4 py-2.5 font-semibold text-white transition hover:bg-terracota-dark"
        >
          Continuar a la calculadora →
        </button>
      </div>
    </div>
  )
}
