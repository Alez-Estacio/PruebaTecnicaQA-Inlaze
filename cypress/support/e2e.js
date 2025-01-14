import './commands'

// Desactivar las capturas de pantalla en caso de fallo para acelerar las pruebas
Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false
})

// Manejo global de excepciones
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
}) 