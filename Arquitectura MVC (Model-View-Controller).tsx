// Arquitectura MVC (Model-View-Controller)


"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
  private model: CounterModel
  private setViewValue: (value: number) => void

  constructor(model: CounterModel, setViewValue: (value: number) => void) {
    this.model = model
    this.setViewValue = setViewValue
  }

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
export default function MVCCounter() {
  const [value, setValue] = useState(0)
  const [controller, setController] = useState<CounterController | null>(null)

  useEffect(() => {
    const model = new CounterModel()
    const newController = new CounterController(model, setValue)
    setController(newController)
  }, [])

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-center">MVC Architecture Counter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl font-bold">{value}</div>
          <div className="flex space-x-2">
            <Button onClick={() => controller?.decrement()}>-</Button>
            <Button onClick={() => controller?.increment()}>+</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// The same example with styles
// Arquitectura MVC (Model-View-Controller)


"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
  private model: CounterModel
  private setViewValue: (value: number) => void

  constructor(model: CounterModel, setViewValue: (value: number) => void) {
    this.model = model
    this.setViewValue = setViewValue
  }

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
export default function MVCCounter() {
  const [value, setValue] = useState(0)
  const [controller, setController] = useState<CounterController | null>(null)

  useEffect(() => {
    const model = new CounterModel()
    const newController = new CounterController(model, setValue)
    setController(newController)
  }, [])

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-center">MVC Architecture Counter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl font-bold">{value}</div>
          <div className="flex space-x-2">
            <Button onClick={() => controller?.decrement()}>-</Button>
            <Button onClick={() => controller?.increment()}>+</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}



