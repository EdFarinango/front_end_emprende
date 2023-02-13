import React from 'react'
import GetStarted from './get-started'

describe('<GetStarted />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GetStarted />)
  })
})