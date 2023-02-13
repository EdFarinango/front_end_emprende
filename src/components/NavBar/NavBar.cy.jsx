import React from "react";
import NavBar from "./NavBar";
import { BrowserRouter as Router } from "react-router-dom";

describe("componente Navbar", () => {
  it("deberia renderizar el componente", () => {
    cy.viewport(1024, 750);
    cy.mount(
      <Router>
        <NavBar />
      </Router>
    );
    cy.get("a").contains("Conferencias y Talleres").click();
    // cy.get("a").contains("Catálogo").click();
    // cy.get("a").contains("Comisión Emprende").click();
    // cy.get("button").contains("I").click();
    // cy.get("a").contains("Iniciar Sesión");
  });
});
