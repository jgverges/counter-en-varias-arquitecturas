# Counter

###  Comparativa de un simple counter desarrollado en varias arquitecturas diferentes
- Clean
- Hexagonal
- MVVM
- Flux-redux
- MVC


## 1- Arquitectura CLEAN:
![image](https://github.com/user-attachments/assets/8a085861-0185-49cd-9a7a-b2d4f4d265d1)

1. Principio: Separación de responsabilidades en capas bien definidas.
2. Capas: Entidades, Casos de Uso, Adaptadores de Interfaz, y Frameworks/Drivers.
3. Ventaja: Alta modularidad y facilidad para probar cada capa de forma independiente.
4. Desventaja: Puede ser excesiva para aplicaciones simples.



- **Capa de Entidades**: Definimos la entidad `CounterEntity` que representa el estado del contador.
- **Capa de Casos de Uso**: Creamos dos casos de uso, `IncrementUseCase` y `DecrementUseCase`, que encapsulan la lógica de negocio para incrementar y decrementar el contador.
- **Capa de Presentación**: El componente React `CleanCounter` actúa como la capa de presentación. Utiliza los casos de uso para modificar el estado del contador y renderiza la interfaz de usuario.
- **Capa de Repositorio**: En este ejemplo simple, no necesitamos una capa de repositorio ya que no estamos persistiendo datos. Si necesitáramos guardar el estado del contador en algún almacenamiento, añadiríamos esta capa.


Esta estructura CLEAN permite una clara separación de responsabilidades:

- La lógica de negocio (incrementar/decrementar) está aislada en los casos de uso.
- La entidad `CounterEntity` define la estructura de datos del contador.
- El componente React se encarga únicamente de la presentación y la gestión del estado local.


Esta arquitectura CLEAN hace que sea fácil extender la aplicación en el futuro. Por ejemplo, si quisiéramos añadir persistencia de datos, podríamos introducir una capa de repositorio sin necesidad de modificar los casos de uso o la capa de presentación.


## 2. Arquitectura Hexagonal (Puertos y Adaptadores):

![image](https://github.com/user-attachments/assets/cefbd0e0-df67-40ed-b863-c850191f0251)

1. Principio: Aislar la lógica de negocio del mundo exterior mediante puertos y adaptadores.
2. Componentes: Dominio central, Puertos (interfaces), y Adaptadores.
3. Ventaja: Flexibilidad para cambiar tecnologías externas sin afectar el núcleo de la aplicación.
4. Desventaja: Puede resultar en más código boilerplate.


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


## 3. Arquitectura MVC (Model-View-Controller):

![image](https://github.com/user-attachments/assets/d9eace2c-58ae-457c-8ea3-3b5179afdcc1)

1. Principio: Separar la lógica de negocio (Model), la presentación (View) y la lógica de control (Controller).
2. Componentes: Modelo, Vista y Controlador.
3. Ventaja: Clara separación de responsabilidades, fácil de entender y ampliamente utilizada.
4. Desventaja: El Controlador puede volverse demasiado grande en aplicaciones complejas.


En MVC, el Modelo representa los datos, la Vista es la interfaz de usuario, 
y el Controlador maneja la lógica de la aplicación y la comunicación entre el Modelo y la Vista.


## 4. Arquitectura Flux/Redux:

![image](https://github.com/user-attachments/assets/cfce33a6-f1a6-4071-9bec-78cf434d9bc8)

1. Principio: Flujo de datos unidireccional y estado centralizado.
2. Componentes: Store, Actions, Reducers y View.
3. Ventaja: Gestión de estado predecible y fácil de depurar, especialmente útil en aplicaciones grandes.
4. Desventaja: Puede ser excesivo para aplicaciones simples y requiere más código boilerplate.

Flux es un patrón de arquitectura que utiliza un flujo de datos unidireccional. Redux es una implementación popular de Flux. 



## 5. Arquitectura MVVM (Model-View-ViewModel):

![image](https://github.com/user-attachments/assets/ea53b625-0f6d-42e2-bec9-e33c3010d5ec)

1. Principio: Separar la lógica de presentación (ViewModel) de la interfaz de usuario (View).
2. Componentes: Modelo, Vista y ViewModel.
3. Ventaja: Facilita la creación de interfaces de usuario reactivas y la reutilización de lógica de presentación.
4. Desventaja: Puede ser confuso determinar qué lógica va en el ViewModel vs el Modelo.


MVVM separa la lógica de negocio y presentación (ViewModel) de la interfaz de usuario (View).

El Model representa los datos y la lógica de negocio.

## Comparacion entre las distintas arquitecturas

### 1. Complejidad:

1. CLEAN y Hexagonal son las más complejas, seguidas por Flux/Redux y MVVM. MVC es generalmente la más simple.
2. Para una aplicación tan simple como un contador, CLEAN y Hexagonal pueden parecer excesivas.



### 2. Escalabilidad:

1. CLEAN, Hexagonal y Flux/Redux son excelentes para aplicaciones grandes y complejas.
2. MVC y MVVM pueden escalar bien, pero pueden requerir más esfuerzo para mantener la organización en proyectos muy grandes.



### 3. Testabilidad:

1. CLEAN y Hexagonal ofrecen la mejor testabilidad debido a su alta modularidad.
2. MVVM y Flux/Redux también permiten una buena testabilidad.
3. MVC puede ser más difícil de testear, especialmente si los controladores se vuelven grandes.



### 4. Facilidad de comprensión:

1. MVC es generalmente la más fácil de entender para los desarrolladores nuevos.
2. Flux/Redux y MVVM tienen conceptos que pueden ser nuevos pero son relativamente fáciles de aprender.
3. CLEAN y Hexagonal pueden tener una curva de aprendizaje más pronunciada.



### 5. Flexibilidad:

1. Hexagonal ofrece la mayor flexibilidad para cambiar tecnologías externas.
2. CLEAN también ofrece buena flexibilidad.
3. Flux/Redux, MVVM y MVC son menos flexibles en este aspecto.



### 6. Adecuación para el ejemplo del contador:

1. MVC o MVVM serían probablemente las más adecuadas para un ejemplo tan simple.
2. Flux/Redux podría ser útil si se espera que la aplicación crezca significativamente.
3. CLEAN y Hexagonal, aunque ofrecen beneficios, podrían considerarse sobredimensionadas para este caso de uso específico.





Cada arquitectura tiene sus fortalezas y debilidades. La elección depende del tamaño y la complejidad del proyecto, los requisitos de escalabilidad y mantenibilidad, y la experiencia del equipo de desarrollo. Para una aplicación simple como un contador, una arquitectura más ligera como MVC o MVVM podría ser suficiente, mientras que para aplicaciones más complejas, CLEAN, Hexagonal o Flux/Redux podrían ofrecer beneficios significativos a largo plazo.

