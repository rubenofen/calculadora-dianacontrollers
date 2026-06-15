import { useMemo } from 'react'
import Section from './Section.jsx'
import ResultPanel from './ResultPanel.jsx'

// Formulario interactivo de una calculadora + panel de resultado en vivo.
export default function CalculatorForm({
  calculator,
  business,
  values,
  onValuesChange,
  onBack,
  onEditBusiness,
}) {
  const onChange = (id, value) => onValuesChange({ ...values, [id]: value })
  const reset = () => onValuesChange(calculator.defaultValues())

  // Recalcula en cada render. El IVA del negocio entra en el cálculo.
  const result = useMemo(() => calculator.compute(values, business), [calculator, values, business])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-gris-claro px-3 py-1.5 text-sm text-gris-medio hover:bg-gris-claro/40"
          >
            ← Cambiar tipo
          </button>
          <div>
            <h1 className="text-xl font-bold text-marino">
              {calculator.icon} {calculator.label}
            </h1>
            {(business.negocio || business.sector) && (
              <p className="text-sm text-gris-medio">
                {business.negocio}
                {business.negocio && business.sector ? ' · ' : ''}
                {business.sector}
              </p>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg px-3 py-1.5 text-sm text-gris-medio hover:bg-gris-claro/40"
        >
          Restablecer valores
        </button>
      </div>

      <p className="mb-6 rounded-lg bg-gris-claro/40 px-4 py-2 text-xs text-gris-medio">
        Todos los campos son opcionales. {calculator.formula}
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        {/* Formulario */}
        <div className="flex flex-col gap-4">
          {calculator.sections.map((s) => (
            <Section key={s.id} section={s} values={values} onChange={onChange} currency={business.currency} />
          ))}
        </div>

        {/* Resultado fijo */}
        <div className="lg:sticky lg:top-6 lg:h-fit">
          <ResultPanel result={result} business={business} calculator={calculator} onEditBusiness={onEditBusiness} />
        </div>
      </div>
    </div>
  )
}
