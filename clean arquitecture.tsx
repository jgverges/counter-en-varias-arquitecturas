// Counter con Clean Architecture

"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Capa de Entidades
interface CounterEntity {
  value: number
}

// Capa de Casos de Uso
class IncrementUseCase {
  execute(counter: CounterEntity): CounterEntity {
    return { value: counter.value + 1 }
  }
}

class DecrementUseCase {
  execute(counter: CounterEntity): CounterEntity {
    return { value: counter.value - 1 }
  }
}

// Capa de Presentación
export default function CleanCounter() {
  const [counter, setCounter] = useState<CounterEntity>({ value: 0 })
  
  const incrementUseCase = new IncrementUseCase()
  const decrementUseCase = new DecrementUseCase()

  const handleIncrement = () => {
    setCounter(incrementUseCase.execute(counter))
  }

  const handleDecrement = () => {
    setCounter(decrementUseCase.execute(counter))
  }

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-center">Clean Architecture Counter</CardTitle>
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


