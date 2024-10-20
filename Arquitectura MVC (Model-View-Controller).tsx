// Arquitectura MVC (Model-View-Controller)

// Modelo
class CounterModel {
  private value: number = 0

  getValue(): number {
    return this.value
  }

  increment(): void {
    this.value++
  }

  decrement(): void {
    this.value--
  }
}

// Controlador
class CounterController {
  constructor(
      private model: CounterModel, 
      private setViewValue: (value: number) => void
    ) {}

  increment(): void {
    this.model.increment()
    this.updateView()
  }

  decrement(): void {
    this.model.decrement()
    this.updateView()
  }

  private updateView(): void {
    this.setViewValue(this.model.getValue())
  }
}

// Vista (Componente React)
import { useState, useEffect } from 'react'

export default function MVCCounter() {
  const [value, setValue] = useState(0)
  const [controller, setController] = useState<CounterController | null>(null)

  useEffect(() => {
    const model = new CounterModel()
    const newController = new CounterController(model, setValue)
    setController(newController)
  }, [])

  return (
    <>
      <h1> Arquitectura MVC Model-View-Controller</h1>
      
      <h2>{value}</h2>
      
        <Button onClick={() => controller?.decrement()}>-</Button>
      
        <Button onClick={() => controller?.increment()}>+</Button>
    </>
  )
}


