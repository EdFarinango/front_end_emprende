import React from 'react'
import { ConfirmPassword } from './ConfirmPassword'
import { BrowserRouter as Router } from 'react-router-dom'

describe('<ConfirmPassword />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Router>
        <ConfirmPassword />
            </Router>
    );
              //falla
            // cy.get("input[name='password']").type("123456789")

            // cy.get("input[name='password_confirmation']").type("123456789")

            // cy.get("button").contains("Enviar").click()

             cy.get("input[name='password']").type("Gsdfsdfsdf")

            cy.get("input[name='password_confirmation']").type("Gasadads")

            cy.get("button").contains("Enviar").click()

          
             
  })
})
