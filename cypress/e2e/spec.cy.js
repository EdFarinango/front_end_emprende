describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
  
    //probar inicio de sesion con credenciales correctas
    cy.get('input[name="email"]').type('eduardo@gmail.com')
    cy.get('input[name="password"]').type('secret')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/administracion')
    //llamar componentes 
    cy.visit('http://localhost:3000/administracion')

    cy.visit('http://localhost:3000/administracion/super')

    //abir un modal
    cy.get('button[type="button"]').click()
   


    
    



    


  })
})