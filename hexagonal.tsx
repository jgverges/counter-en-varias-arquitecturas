// counter con arquitectura hexagonal

"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Dominio
class Counter {
  constructor(public value: number = 0) {}

  increment(): void {
    this.value++
  }

  decrement(): void {
    this.value--
  }
}

// Puertos (interfaces)
interface CounterRepository {
  save(counter: Counter): void
  get(): Counter
}

interface CounterPresenter {
  display(counter: Counter): void
}

// Adaptadores
class InMemoryCounterRepository implements CounterRepository {
  private counter: Counter = new Counter()

  save(counter: Counter): void {
    this.counter = counter
  }

  get(): Counter {
    return this.counter
  }
}

class ReactCounterPresenter implements CounterPresenter {
  constructor(private setCounter: React.Dispatch<React.SetStateAction<Counter>>) {}

  display(counter: Counter): void {
    this.setCounter(counter)
  }
}

// Casos de uso
class IncrementUseCase {
  constructor(private repository: CounterRepository, private presenter: CounterPresenter) {}

  execute(): void {
    const counter = this.repository.get()
    counter.increment()
    this.repository.save(counter)
    this.presenter.display(counter)
  }
}

class DecrementUseCase {
  constructor(private repository: CounterRepository, private presenter: CounterPresenter) {}

  execute(): void {
    const counter = this.repository.get()
    counter.decrement()
    this.repository.save(counter)
    this.presenter.display(counter)
  }
}

// Componente React (Adaptador de UI)
export default function HexagonalCounter() {
  const [counter, setCounter] = useState(new Counter())

  // Inicialización de la arquitectura
  const repository = new InMemoryCounterRepository()
  const presenter = new ReactCounterPresenter(setCounter)
  const incrementUseCase = new IncrementUseCase(repository, presenter)
  const decrementUseCase = new DecrementUseCase(repository, presenter)

  const handleIncrement = () => incrementUseCase.execute()
  const handleDecrement = () => decrementUseCase.execute()

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-center">Hexagonal Architecture Counter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl font-bold">{counter.value}</div>
          <div className="flex space-x-2">
            <Button onClick={handleDecrement}>-</Button>
            <Button onClick={handleIncrement}>+</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


// ## Version simplificada 

"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Dominio
const incrementCounter = (value: number) => value + 1
const decrementCounter = (value: number) => value - 1

// Puerto
type CounterPort = (value: number) => void

// Adaptador
const createCounterAdapter = (setValue: React.Dispatch<React.SetStateAction<number>>): CounterPort => {
  return (value: number) => setValue(value)
}

// Casos de uso
const createIncrementUseCase = (adapter: CounterPort) => {
  return (value: number) => adapter(incrementCounter(value))
}

const createDecrementUseCase = (adapter: CounterPort) => {
  return (value: number) => adapter(decrementCounter(value))
}

// Componente React (Adaptador de UI)
export default function HexagonalCounter() {
  const [value, setValue] = useState(0)
  
  const counterAdapter = createCounterAdapter(setValue)
  const incrementUseCase = createIncrementUseCase(counterAdapter)
  const decrementUseCase = createDecrementUseCase(counterAdapter)

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-center">Hexagonal Architecture Counter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl font-bold">{value}</div>
          <div className="flex space-x-2">
            <Button onClick={() => decrementUseCase(value)}>-</Button>
            <Button onClick={() => incrementUseCase(value)}>+</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// En esta versión simplificada:

// 1. Hemos reemplazado las clases por funciones simples.
// 2. El "dominio" se representa mediante las funciones `incrementCounter` y `decrementCounter`.
// 3. El "puerto" se define como un tipo de función `CounterPort`.
// 4. El "adaptador" es una función que crea una implementación del puerto utilizando `setValue` de React.
// 5. Los "casos de uso" son funciones que utilizan el dominio y el adaptador para realizar las operaciones.
// 6. El componente React actúa como el adaptador de UI, utilizando los casos de uso para manejar los clics de los botones.


// Esta implementación mantiene la esencia de la arquitectura hexagonal:

// - Separación de responsabilidades entre dominio, puertos, adaptadores y casos de uso.
// - El dominio (lógica de negocio) está aislado de la implementación de UI.
// - Los casos de uso orquestan las operaciones utilizando el dominio y los adaptadores.


