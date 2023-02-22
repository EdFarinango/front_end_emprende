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

    cy.get('input[name="email"]').type("epfarinango@gmail.com");
    cy.get('input[name="password"]').type("Gadiel2464");
    cy.get('button[type="submit"]').click();
    
  });
});
