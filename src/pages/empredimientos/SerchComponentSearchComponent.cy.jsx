import React from 'react'
import SearchComponent from './SerchComponent'

describe('<SearchComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SearchComponent />)
  })
})