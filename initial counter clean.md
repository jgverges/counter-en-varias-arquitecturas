# Counter con Clean Architecture

```tsx project="CleanCounter" file="clean-counter.tsx"
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

```

Esta implementación sigue los principios de la arquitectura CLEAN:

1. **Capa de Entidades**: Definimos la entidad `CounterEntity` que representa el estado del contador.
2. **Capa de Casos de Uso**: Creamos dos casos de uso, `IncrementUseCase` y `DecrementUseCase`, que encapsulan la lógica de negocio para incrementar y decrementar el contador.
3. **Capa de Presentación**: El componente React `CleanCounter` actúa como la capa de presentación. Utiliza los casos de uso para modificar el estado del contador y renderiza la interfaz de usuario.
4. **Capa de Repositorio**: En este ejemplo simple, no necesitamos una capa de repositorio ya que no estamos persistiendo datos. Si necesitáramos guardar el estado del contador en algún almacenamiento, añadiríamos esta capa.


Esta estructura permite una clara separación de responsabilidades:

- La lógica de negocio (incrementar/decrementar) está aislada en los casos de uso.
- La entidad `CounterEntity` define la estructura de datos del contador.
- El componente React se encarga únicamente de la presentación y la gestión del estado local.


Esta arquitectura hace que sea fácil extender la aplicación en el futuro. Por ejemplo, si quisiéramos añadir persistencia de datos, podríamos introducir una capa de repositorio sin necesidad de modificar los casos de uso o la capa de presentación.
