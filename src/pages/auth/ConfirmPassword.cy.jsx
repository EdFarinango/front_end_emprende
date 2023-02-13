import React from "react";
import { ConfirmPassword } from "./ConfirmPassword";
import { BrowserRouter as Router } from "react-router-dom";

describe("<ConfirmPassword />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Router>
        <ConfirmPassword />
      </Router>
    );

    if (
      cy.get("div").contains("La contraseña debe contener al menos una mayúscula y una minúscula, La contraseña debe contener al menos 8 caracteres")
    ) {
      cy.get("input[name='password']").type("A");
      cy.get("input[name='password_confirmation']").type("A");
      cy.get("button").contains("Enviar").click();
    }
  });
});
