import React from 'react'
import { AuthRecovery } from './AuthRecovery'
import { BrowserRouter as Router } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

describe('<AuthRecovery />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Router>
        < AuthRecovery />
        <Outlet/>
      </Router>
    )
  })
})