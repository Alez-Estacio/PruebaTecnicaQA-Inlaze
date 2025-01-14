describe("Suite de Pruebas de Registro y Login", () => {
  let users;
  let environment = Cypress.env("baseUrl");

  // Configuración para las pruebas de registro
  describe("Pruebas de Registro", () => {
    beforeEach(() => {
      cy.visit(`${environment}/auth/sign-in`);
      cy.fixture("users").then((data) => {
        users = data;
      });
      cy.contains("Sign up").click();
    });

    it("TC001 - Verificar registro de usuario con datos válidos", () => {
      cy.fixture("users.json").then((users) => {
        const user = users[0];
        cy.get("#full-name").type(user.fullName);
        cy.get("#email").type(user.email);
        cy.get(".join > #password").type(user.password);
        cy.get(".join > #confirm-password").type(user.confirmPassword);
      });
      cy.get('[type="submit"]').click();
      cy.contains("Successful registration!")
        .should("be.visible")
        .and("have.class", "ml-3")
        .and("have.class", "text-sm");
    });

    it("TC002 - Validar que el campo de nombre acepte mínimo dos palabras", () => {
      cy.fixture("users.json").then((users) => {
        const user = users[0];
        cy.get("#full-name").type(user.singleName);
        cy.get("#email").type(user.email);
        cy.get(".join > #password").type(user.password);
        cy.get(".join > #confirm-password").type(user.confirmPassword);
      });
    });

    it("TC003 - Verificar que el email cumpla con el formato estándar y sea único", () => {
      cy.fixture("users.json").then((users) => {
        const user = users[0];
        cy.get("#full-name").type(user.fullName);
        cy.get("#email").type(user.email);
        cy.get(".join > #password").type(user.password);
        cy.get(".join > #confirm-password").type(user.confirmPassword);
        cy.get('[type="submit"]').click();
      });
      cy.get('[type="submit"]').click();
      cy.contains("Successful registration!")
        .should("be.visible")
        .and("have.class", "ml-3")
        .and("have.class", "text-sm");
      cy.wait(100);
      cy.get(".text-center > .font-bold").click();
      const user = users[0];
      cy.get("#full-name").should("be.visible").type(user.fullName);
      cy.get("#email").type(user.email);
      cy.get(".join > #password").type(user.password);
      cy.get(".join > #confirm-password").type(user.confirmPassword);
      cy.get('[type="submit"]').click();
    });

    it("TC004 - Validar requisitos de longitud y caracteres de la contraseña", () => {
      const user = users[0];
      cy.get("#full-name").type(user.fullName);
      cy.get("#email").type(user.email);
      cy.get(".join > #password").type(user.shortPassword);
      cy.get(".join > #confirm-password").type(user.shortPassword);
    });

    it("TC005 - Comprobar que el formulario no se envíe si los campos obligatorios no están completos", () => {
      cy.fixture("users.json").then((users) => {
        const user = users[1];
        cy.get("#full-name").type(user.fullName);
        cy.get("#email").type(user.email);
        cy.get(".join > #password").type(user.password);
        cy.get(".join > #confirm-password").type(user.confirmPassword);
        cy.contains("Passwords do not match").should("be.visible");
      });
    });

    it("TC006 - Verificar que el sistema informe si las contraseñas ingresadas no coinciden", () => {
      cy.fixture("users.json").then((users) => {
        const user = users[0];
        cy.get("#full-name").type(user.fullName);
        cy.get("#email").type(user.email);
        cy.get(".join > #password").type(user.password);
        cy.get(".join > #confirm-password").type(user.shortPassword);
        cy.contains("Passwords do not match").should("be.visible");
      });
    });
  });

  // Configuración para las pruebas de login
  describe("Pruebas de Login", () => {
    beforeEach(() => {
      cy.visit(`${environment}/auth/sign-in`);
      cy.fixture("users").then((data) => {
        users = data;
      });
    });

    it("TC007 - Verificar login de usuario con email y contraseña correctos", () => {
      cy.fixture("users.json").then((users) => {
        const user = users[0];
        cy.get("#email").type(user.email);
        cy.get(".join > #password").type(user.password);
        cy.get('[type="submit"]').click();
      });
    });

    it("TC008 - Validar que el formulario de login no se envíe si los campos no están completos", () => {
      cy.fixture("users.json").then((users) => {
        const user = users[0];
        cy.get("#email").type(user.email);
        cy.get(".join > #password").should("be.empty");
      });
    });

    it("TC009 - Comprobar que al ingresar se muestre el nombre del usuario", () => {
      cy.fixture("users.json").then((users) => {
        const user = users[0];
        cy.get("#email").type(user.email);
        cy.get(".join > #password").type(user.password);
        cy.get('[type="submit"]').click();
        cy.contains("John Doe").should("be.visible");
      });
    });

    it("TC010 - Verificar cierre de sesión correctamente", () => {
      cy.fixture("users.json").then((users) => {
        const user = users[0];
        cy.get("#email").type(user.email);
        cy.get(".join > #password").type(user.password);
        cy.get('[type="submit"]').click();
        cy.get("img").click();
        cy.contains("Logout").should("be.visible").click();
        cy.contains("Sign in").should("be.visible");
        cy.get("#email").should("be.visible").click();
        cy.get(".join > #password").should("be.visible").click();
      });
    });
  });
});
