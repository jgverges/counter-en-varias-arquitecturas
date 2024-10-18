# Arquitectura Flux/Redux

Flux es un patrón de arquitectura que utiliza un flujo de datos unidireccional. Redux es una implementación popular de Flux. 
Aquí hay un ejemplo utilizando Redux Toolkit, que simplifica la configuración de Redux:

```tsx
"use client"

import { useState } from 'react'
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Slice (combina acciones y reducer)
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

// Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
})

// Tipos
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

// Componente Counter
function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-center">Redux Architecture Counter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl font-bold">{count}</div>
          <div className="flex space-x-2">
            <Button onClick={() => dispatch(counterSlice.actions.decrement())}>-</Button>
            <Button onClick={() => dispatch(counterSlice.actions.increment())}>+</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente principal con Provider
export default function ReduxCounter() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
}

```
