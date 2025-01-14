# 🚀 Prueba Técnica Inlaze - Automatización de Pruebas

## 🛠️ Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)
- Git

## 📥 Instalación

1. Clona el repositorio en tu máquina local:
    ```sh
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_REPOSITORIO>
    ```

2. Instala las dependencias del proyecto:
    ```sh
    npm install
    ```

## ⚙️ Configuración

1. Asegúrate de que el archivo [`cypress.env.json`](cypress.env.json ) contenga la URL base correcta para el entorno de pruebas:
    ```json
    {
      "baseUrl": "https://test-qa.inlaze.com"
    }
    ```

2. Verifica que el archivo [`cypress.config.js`](cypress.config.js ) esté configurado correctamente:
    ```js
    const { defineConfig } = require('cypress')

    module.exports = defineConfig({
      e2e: {
        setupNodeEvents(on, config) {
          // Implementa los eventos de Node aquí
        },
        specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}"
      },
    });
    ```

## 🧪 Ejecución de Pruebas
1.npx cypress open.

2.Selecciona el navegador Edge o el de tu preferencia y Click en el boton Start E2E Testing in Edge.

3.Click en login y automáticamente se ejecuta la prueba.

### 🏃 Ejecución en modo Headless

Para ejecutar las pruebas en modo headless, utiliza el siguiente comando:
```sh
npm cypress run 
