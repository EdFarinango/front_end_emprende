import React from 'react'
import ModalPswd from './ModalPswd'

describe('<ModalPswd />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ModalPswd />)
  })
})