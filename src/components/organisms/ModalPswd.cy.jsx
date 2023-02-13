import React from 'react'
import ModalPswd from './ModalPswd'

describe('<ModalPswd />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ModalPswd />)

    // see: https://on.cypress.io/interacting-with-elements

    cy.get('button').type('button')
    cy.get('input[name="password"]').type('password')
    cy.get('input[name="password_confirmation"]').type('password')
    cy.get('div').contains('La contraseña debe contener al menos una mayúscula y una minúscula.')
 


  })
})