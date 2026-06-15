import { useState } from 'react'
import TypeSelector from './components/TypeSelector.jsx'
import CalculatorForm from './components/CalculatorForm.jsx'
import { getCalculator } from './calculators/index.js'

export default function App() {
  const [typeId, setTypeId] = useState(null)
  const calculator = typeId ? getCalculator(typeId) : null

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {calculator ? (
        <CalculatorForm calculator={calculator} onBack={() => setTypeId(null)} />
      ) : (
        <TypeSelector onSelect={setTypeId} />
      )}
    </div>
  )
}
