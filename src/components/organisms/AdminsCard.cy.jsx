import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AdminCard from './AdminCard'

describe('Componente card de administradores', () => {
  it("deberia renderizar el componente", () => {
    cy.viewport(1024, 750)
    
    
    cy.mount(
      <Router>
        <AdminCard />
      </Router>
    );

   cy.get("button").contains("Crear").click();

   cy.get ("input[name='first_name']").type("Eduardo");
    cy.get ("input[name='last_name']").type("Garcia");
    cy.get ("input[name='email']").type("egarcia@gmail.com"); 
    cy.get ("input[name='personal_phone']").type("123456789");
    cy.get ("input[name='linkedin']").type("linkedin.com");

    cy.get("button").contains("Crear").click()
    //ver administradores 
    
   







    










  })
})