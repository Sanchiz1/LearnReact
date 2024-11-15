import { useState } from 'react'
import './App.css'
import PaymentForm from './components/PaymentForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PaymentForm />
    </>
  )
}

export default App
