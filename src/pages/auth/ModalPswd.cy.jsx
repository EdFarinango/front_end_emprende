import React from "react";
import ModalPswd from "./ModalPswd";
import { BrowserRouter as Router } from "react-router-dom";

describe("<ModalPswd />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Router>
        <ModalPswd />
      </Router>
    );

    cy.get("p").contains("Recuperar Contraseña ").click();
    cy.get("input[name='email']").type("admin@gmail.com");
    cy.get("button").contains("Enviar").click();
  });
});
