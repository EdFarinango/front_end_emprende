

describe("template spec", () => {
  it("passes", () => {
    cy.viewport(1920, 750);
    cy.visit("http://localhost:3000");


    cy.get("button").contains("I").click();
    
    cy.get("a")
      .contains("Iniciar Sesión")
      .click()
      .url()
      .should("include", "/login");




    
    cy.get('input[name="email"]').type("eduardo@gmail.com");
    cy.get('input[name="password"]').type("secret");
    cy.get('button[type="submit"]').click();
    cy.time = 1000;


    cy.get("button").contains("E").click();


    cy.get("a")
      .contains("Cerrar Sesión")
      .click()
      .url()
      .should("include", "/");
    
    
  });
});


