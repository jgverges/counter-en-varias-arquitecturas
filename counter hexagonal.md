# counter con arquitectura hexagonal

Claro, voy a recrear el ejemplo del contador utilizando la arquitectura hexagonal (también conocida como arquitectura de puertos y adaptadores). Esta arquitectura nos permite separar aún más las preocupaciones y hacer que nuestra aplicación sea más flexible y fácil de mantener.

Aquí está la implementación del contador utilizando arquitectura hexagonal:

```tsx project="HexagonalCounter" file="hexagonal-counter.tsx"
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
```

Explicación de la arquitectura hexagonal implementada:

## **Dominio**: 

La clase `Counter` representa nuestro modelo de dominio. Contiene la lógica de negocio para incrementar y decrementar el contador.

## **Puertos**:

1. `CounterRepository`: Define cómo se debe persistir y recuperar el estado del contador.
2. `CounterPresenter`: Define cómo se debe mostrar el estado del contador.



##  **Adaptadores**:

1. `InMemoryCounterRepository`: Implementa `CounterRepository` para almacenar el contador en memoria.
2. `ReactCounterPresenter`: Implementa `CounterPresenter` para actualizar el estado de React.



## **Casos de uso**:

`IncrementUseCase` y `DecrementUseCase` orquestan las operaciones utilizando el repositorio y el presentador.

##  **Componente React**: 

Actúa como un adaptador de UI, inicializando la arquitectura y manejando las interacciones del usuario.


Esta arquitectura hexagonal nos proporciona varias ventajas:

- **Independencia del framework**: El dominio y los casos de uso no dependen de React o cualquier otra tecnología externa.
- **Fácil de testear**: Podemos probar cada parte de la aplicación de forma aislada.
- **Flexibilidad**: Podemos cambiar fácilmente la implementación del repositorio (por ejemplo, para usar localStorage o una API) sin afectar al resto de la aplicación.
- **Separación de responsabilidades**: Cada parte de la aplicación tiene una responsabilidad clara y bien definida.


Esta implementación demuestra cómo incluso una aplicación simple como un contador puede beneficiarse de una arquitectura robusta y flexible.

## Version simplificada porque fallaba preview de v0 vercel

Entiendo que el contador sigue sin funcionar. Vamos a simplificar aún más el código y asegurarnos de que funcione correctamente en la vista previa.

Vamos a reescribir el componente con una versión muy simplificada que mantenga la esencia de la arquitectura hexagonal:

```tsx project="HexagonalCounter" file="hexagonal-counter.tsx"
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
```

En esta versión simplificada:

1. Hemos reemplazado las clases por funciones simples.
2. El "dominio" se representa mediante las funciones `incrementCounter` y `decrementCounter`.
3. El "puerto" se define como un tipo de función `CounterPort`.
4. El "adaptador" es una función que crea una implementación del puerto utilizando `setValue` de React.
5. Los "casos de uso" son funciones que utilizan el dominio y el adaptador para realizar las operaciones.
6. El componente React actúa como el adaptador de UI, utilizando los casos de uso para manejar los clics de los botones.


Esta implementación mantiene la esencia de la arquitectura hexagonal:

- Separación de responsabilidades entre dominio, puertos, adaptadores y casos de uso.
- El dominio (lógica de negocio) está aislado de la implementación de UI.
- Los casos de uso orquestan las operaciones utilizando el dominio y los adaptadores.


Esta versión simplificada debería funcionar correctamente en la vista previa. Los botones de incremento y decremento deberían actualizar el valor del contador, y el componente se debería re-renderizar correctamente.

Si aún así la vista previa no funciona, por favor, házmelo saber y buscaremos una solución alternativa o investigaremos si hay algún problema con el entorno de ejecución.
