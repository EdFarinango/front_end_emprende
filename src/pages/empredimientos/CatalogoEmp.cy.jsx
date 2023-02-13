import React from 'react'
import CatalogoEmp from './CatalogoEmp'

describe('<CatalogoEmp />', () => {
  it('renders', () => {
    cy.viewport(1024, 750)
    cy.mount(<CatalogoEmp />)
  })
})