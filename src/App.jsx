import { useState, useEffect } from 'react'
import TypeSelector from './components/TypeSelector.jsx'
import BusinessForm from './components/BusinessForm.jsx'
import CalculatorForm from './components/CalculatorForm.jsx'
import { getCalculator, CALCULATOR_TYPES } from './calculators/index.js'
import { defaultBusiness } from './config/global.js'
import { loadJSON, saveJSON } from './lib/storage.js'

// Claves de almacenamiento.
const BUSINESS_KEY = 'calc.business'
const valuesKey = (id) => `calc.values.${id}`

export default function App() {
  const [stage, setStage] = useState('type') // 'type' | 'business' | 'calc'
  const [typeId, setTypeId] = useState(null)
  // Datos del negocio: se recuperan de localStorage y se fusionan con los
  // defaults (así campos nuevos —p. ej. costes indirectos— tienen valor inicial).
  const [business, setBusiness] = useState(() => ({ ...defaultBusiness(), ...(loadJSON(BUSINESS_KEY, null) || {}) }))
  const [values, setValues] = useState(null)

  const calculator = typeId ? getCalculator(typeId) : null
  const type = CALCULATOR_TYPES.find((t) => t.id === typeId) || null

  // Persiste los datos del negocio en cada cambio.
  useEffect(() => {
    saveJSON(BUSINESS_KEY, business)
  }, [business])

  // Persiste los valores de la calculadora activa en cada cambio.
  useEffect(() => {
    if (typeId && values) saveJSON(valuesKey(typeId), values)
  }, [typeId, values])

  const selectType = (id) => {
    setTypeId(id)
    const calc = getCalculator(id)
    if (calc) {
      // Recupera los valores guardados de esta calculadora y los fusiona con los
      // defaults (así los campos nuevos del Excel siguen teniendo valor inicial).
      const saved = loadJSON(valuesKey(id), null)
      setValues({ ...calc.defaultValues(), ...(saved || {}) })
    } else {
      setValues(null)
    }
    setStage('business')
  }

  if (stage === 'business' && calculator) {
    return (
      <div className="min-h-screen bg-blanco text-marino">
        <BusinessForm
          type={type}
          business={business}
          onChange={setBusiness}
          onContinue={() => setStage('calc')}
          onBack={() => setStage('type')}
        />
      </div>
    )
  }

  if (stage === 'calc' && calculator) {
    return (
      <div className="min-h-screen bg-blanco text-marino">
        <CalculatorForm
          calculator={calculator}
          business={business}
          values={values}
          onValuesChange={setValues}
          onBack={() => setStage('type')}
          onEditBusiness={() => setStage('business')}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blanco text-marino">
      <TypeSelector onSelect={selectType} />
    </div>
  )
}
