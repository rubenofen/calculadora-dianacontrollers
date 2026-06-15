import { useState } from 'react'
import TypeSelector from './components/TypeSelector.jsx'
import BusinessForm from './components/BusinessForm.jsx'
import CalculatorForm from './components/CalculatorForm.jsx'
import { getCalculator, CALCULATOR_TYPES } from './calculators/index.js'
import { defaultBusiness } from './config/global.js'

export default function App() {
  const [stage, setStage] = useState('type') // 'type' | 'business' | 'calc'
  const [typeId, setTypeId] = useState(null)
  const [business, setBusiness] = useState(defaultBusiness)
  const [values, setValues] = useState(null)

  const calculator = typeId ? getCalculator(typeId) : null
  const type = CALCULATOR_TYPES.find((t) => t.id === typeId) || null

  const selectType = (id) => {
    setTypeId(id)
    const calc = getCalculator(id)
    setValues(calc ? calc.defaultValues() : null) // reinicia los valores al cambiar de tipo
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
