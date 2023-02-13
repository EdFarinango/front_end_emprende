import React from 'react'
import Repositorio from './Repositorio'

describe('<Repositorio />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Repositorio />)
  })
})