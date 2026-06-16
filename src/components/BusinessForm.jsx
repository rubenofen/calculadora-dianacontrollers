import { CURRENCIES, BUSINESS_INDIRECT_FIELDS } from '../config/global.js'
import Field from './Field.jsx'

// Paso "DATOS DE TU NEGOCIO" (Portada del Excel). Se rellena tras elegir el
// tipo y se refleja en la calculadora. Moneda e IVA alimentan el cálculo.
export default function BusinessForm({ type, business, onChange, onContinue, onBack }) {
  const set = (k, v) => onChange({ ...business, [k]: v })

  const inputCls =
    'w-full rounded-md border border-gris-claro bg-white px-2.5 py-1.5 text-sm text-marino outline-none focus:border-terracota focus:ring-1 focus:ring-terracota/20'
  const labelCls = 'flex flex-col gap-0.5'
  const labelTextCls = 'text-xs text-gris-medio'

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 rounded-lg border border-gris-claro px-3 py-1.5 text-sm text-gris-medio hover:bg-gris-claro/40"
      >
        ← Cambiar tipo
      </button>

      <div className="rounded-2xl border border-gris-claro bg-white p-5 shadow-sm">
        <h1 className="text-lg font-bold text-marino">Datos de tu negocio</h1>
        <p className="mt-0.5 text-xs text-gris-medio">
          {type?.icon} {type?.label} · Se reflejan en la calculadora. Todo es opcional.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
          <label className={`${labelCls} sm:col-span-2`}>
            <span className={labelTextCls}>Nombre del negocio / freelancer</span>
            <input
              className={inputCls}
              value={business.negocio}
              placeholder="Tu Nombre o Empresa"
              onChange={(e) => set('negocio', e.target.value)}
            />
          </label>

          <label className={`${labelCls} sm:col-span-2`}>
            <span className={labelTextCls}>Sector</span>
            <input
              className={inputCls}
              value={business.sector}
              placeholder="Ej: Consultoría, Formación, Ingeniería…"
              onChange={(e) => set('sector', e.target.value)}
            />
          </label>

          <label className={labelCls}>
            <span className={labelTextCls}>Moneda</span>
            <select className={inputCls} value={business.currency} onChange={(e) => set('currency', e.target.value)}>
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className={labelCls}>
            <span className={labelTextCls}>IVA general aplicable (%)</span>
            <input
              type="number"
              inputMode="decimal"
              className={inputCls}
              value={business.ivaPct}
              onChange={(e) => set('ivaPct', e.target.value)}
            />
          </label>

          <label className={`${labelCls} sm:col-span-2`}>
            <span className={labelTextCls}>Fecha de actualización</span>
            <input
              type="date"
              className={inputCls}
              value={business.fecha}
              onChange={(e) => set('fecha', e.target.value)}
            />
          </label>
        </div>

        {/* Costes indirectos (estructura mensual) — comunes a todas las calculadoras */}
        <div className="mt-5 border-t border-gris-claro/60 pt-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-2">
            <h2 className="text-sm font-semibold text-marino">Costes indirectos</h2>
            <span className="text-xs text-gris-medio/80">importes mensuales en {business.currency}</span>
          </div>
          <p className="mt-0.5 text-xs text-gris-medio">
            Gastos fijos del negocio, comunes a todas las calculadoras. Se prorratean entre las horas facturables.
          </p>
          <div className="mt-1 grid grid-cols-1 gap-x-5 sm:grid-cols-2">
            {BUSINESS_INDIRECT_FIELDS.map((f) => {
              // Los importes en €/mes comparten unidad (indicada en la cabecera);
              // solo el campo de horas conserva su sufijo.
              const field = f.unit === '€/mes' ? { ...f, unit: undefined } : f
              return (
                <Field key={f.id} field={field} value={business[f.id] ?? ''} onChange={(id, val) => set(id, val)} />
              )
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="mt-5 w-full rounded-lg bg-terracota px-4 py-2.5 font-semibold text-white transition hover:bg-terracota-dark"
        >
          Continuar a la calculadora →
        </button>
      </div>
    </div>
  )
}
