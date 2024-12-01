# API VIDEOJUEGOS 🎮

Este proyecto es una aplicación basada en consola que permite la gestión de personajes y misiones en un entorno de juego. Los usuarios pueden crear personajes, asignarles misiones y realizar diversas operaciones relacionadas con su progreso.
Con uso de TypeScript, Programación Orientada a Objetos (POO), programación asíncrona, y versionado de código con Git y GitHub.

### 🚀 Características

#### Gestión de Personajes:

- Crear personajes de tipo Warrior o Mage.
- Listar todos los personajes existentes.
- Actualizar las estadísticas de los personajes (nivel, salud, experiencia).
- Mejorar personajes según sus necesidades.

#### Gestión de Misiones:

- Asignar misiones a los personajes.
- Listar las misiones asignadas a cada personaje.
- Ejecutar misiones y verificar el progreso.
- Simulación de Juego:

###### Incluye eventos interactivos y dinámicos para mejorar la experiencia del juego.

### 📂 Estructura del Proyecto

📁 src/
├── 📁 controllers/ (characterController, gameEvent, gameLogic, interface).
├── 📁 helpers/ (Experience, ListEvents, MissionType, Probabilities).
├── 📁 models/ (Character, Warrior, Mage, Mission).
└── 📄 index.ts (Archivo de inicio).

### 🛠️ Requisitos Previos

Node.js (v16 o superior).
npm (Administrador de paquetes de Node.js).

### 📦 Instalación

#### Clona este repositorio:

git clone https://github.com/Eveolmedo/Api_videojuego
npm install
npm run build

### ▶️ Uso

#### Ejecuta el programa en la consola:

##### npx ts-node index.ts

Sigue las instrucciones que aparecen en pantalla para interactuar con el sistema.

Menú Principal
Crear un personaje
Listar personajes
Asignar misión a un personaje
Listar misiones de un personaje
Mejorar un personaje
Ejecutar misiones de un personaje
Salir

### ✨ Ejemplo de Uso

#### Crear un personaje:

Ingresa un nombre, tipo (Warrior o Mage), y nivel inicial.

#### Asignar misiones:

Describe la misión, define su dificultad (Easy, Medium, Hard), y asigna al personaje.

#### Ejecutar misiones:

Revisa si el personaje tiene éxito según su nivel.

#### Mejorar personajes:

Cambia sus atributos como nivel, vida, y experiencia.
