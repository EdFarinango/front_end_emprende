

describe('template spec', () => {
  it('passes', () => {
    cy.viewport(1920, 750);
    cy.visit("http://localhost:3000");


    cy.get("button").contains("I").click();
    
    cy.get("a")
      .contains("Iniciar Sesión")
      .click()
      .url()
      .should("include", "/login");




    
    cy.get('input[name="email"]').type("superadmin@gmail.com");
    cy.get('input[name="password"]').type("secret");
    cy.get('button[type="submit"]').click();

    cy.timeout(10000);



    cy.get( '@btn').click({ multiple: true });

    cy.get("button[class='btnedit btn-secondary btn btn-primary']").click({ multiple: true });



    
  })
})