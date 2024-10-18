// Arquitectura MVVM (Model-View-ViewModel)



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

// ViewModel
class CounterViewModel {
  private model: CounterModel
  private listeners: (() => void)[] = []

  constructor(model: CounterModel) {
    this.model = model
  }

  getValue(): number {
    return this.model.getValue()
  }

  increment(): void {
    this.model.increment()
    this.notifyListeners()
  }

  decrement(): void {
    this.model.decrement()
    this.notifyListeners()
  }

  addListener(listener: () => void): void {
    this.listeners.push(listener)
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener())
  }
}

// Vista (Componente React)
export default function MVVMCounter() {
  const [value, setValue] = useState(0)
  const [viewModel] = useState(() => new CounterViewModel(new CounterModel()))

  useEffect(() => {
    const updateView = () => setValue(viewModel.getValue())
    viewModel.addListener(updateView)
    updateView() // Inicializar la vista
  }, [viewModel])

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-center">MVVM Architecture Counter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl font-bold">{value}</div>
          <div className="flex space-x-2">
            <Button onClick={() => viewModel.decrement()}>-</Button>
            <Button onClick={() => viewModel.increment()}>+</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
