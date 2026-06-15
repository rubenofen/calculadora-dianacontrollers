import { useMemo, useState } from 'react'
import Section from './Section.jsx'
import ResultPanel from './ResultPanel.jsx'
import { GLOBAL } from '../config/global.js'

// Formulario interactivo de una calculadora + panel de resultado en vivo.
export default function CalculatorForm({ calculator, onBack }) {
  const [values, setValues] = useState(() => calculator.defaultValues())

  const onChange = (id, value) => setValues((prev) => ({ ...prev, [id]: value }))
  const reset = () => setValues(calculator.defaultValues())

  // Recalcula en cada render (los inputs son la única fuente de estado).
  const result = useMemo(() => calculator.compute(values, GLOBAL), [calculator, values])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
          >
            ← Cambiar tipo
          </button>
          <h1 className="text-xl font-bold text-slate-900">
            {calculator.icon} {calculator.label}
          </h1>
        </div>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100"
        >
          Restablecer valores
        </button>
      </div>

      <p className="mb-6 rounded-lg bg-slate-100 px-4 py-2 text-xs text-slate-500">
        Todos los campos son opcionales. {calculator.formula}
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        {/* Formulario */}
        <div className="flex flex-col gap-4">
          {calculator.sections.map((s) => (
            <Section key={s.id} section={s} values={values} onChange={onChange} />
          ))}
        </div>

        {/* Resultado fijo */}
        <div className="lg:sticky lg:top-6 lg:h-fit">
          <ResultPanel result={result} />
        </div>
      </div>
    </div>
  )
}
