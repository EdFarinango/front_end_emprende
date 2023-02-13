import React from "react";
import ModalNewEmp from "./ModalPeticionEmp";
import { BrowserRouter as Router } from "react-router-dom";

describe("<ModalNewEmp />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport(1024, 750);
    cy.mount(
      <Router>
        <ModalNewEmp />
      </Router>
    );

    cy.get("button").contains("Fomulario de petición de ingreso").click();
    cy.get('select[name="rol_esfot"]').select("Estudiante");
    cy.get('input[name="nombre"]').type("Juan");
    cy.get('input[name="descripcion"]').type("Venta de Comida");
    cy.get('select[name="categoria"]').select("Alimentación");
    cy.get('input[name="direccion"]').type("Av. 12 de Octubre");
    cy.get('select[name="cobertura"]').select("Quito Norte");
    cy.get('input[name="pagina_web"]').type("no posee");
    cy.get('input[name="telefono"]').type("0987654321");
    cy.get('input[name="whatsapp"]').type("0987654321");
    cy.get('input[name="facebook"]').type("no posee");
    cy.get('input[name="instagram"]').type("no posee");
    cy.get('input[name="descuento"]').type("10");
    cy.get("button").contains("Guardar").click();
  });
});
