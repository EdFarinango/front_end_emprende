import React from "react";
import NavBar from "./NavBar";
import { BrowserRouter as Router } from "react-router-dom";

describe("componente Navbar", () => {
  it("deberia renderizar el componente", () => {
    cy.viewport(1024, 750)
    cy.mount(
      <Router>
        <NavBar />
      </Router>
    );

    cy.get("button").contains("I").click();
    cy.get("a")
      .contains("Iniciar Sesión")
      .click();
    cy.get("a")
      .contains("Iniciar Sesión")
      .click()
      .url()
      .should("include", "/login");
  });
});
