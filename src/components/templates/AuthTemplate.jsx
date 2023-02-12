import React from "react";
import { Outlet } from "react-router-dom";

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

import "../../components/templates/style.css";

import IMG from "../assets/login.png" ;

export const AuthTemplate = () => {
  return (
    <>
      <MDBContainer fluid className="p-3 my-5 h-custom ">
        <MDBRow  className="align-items-center justify-content-center">
          <MDBCol col="10" md="4"  className="align-items-center justify-content-center">
            <img
              src={IMG}
              className="img-fluid"
              width={600}
              height={500}
              
              alt="login"
            />
          </MDBCol>

          <MDBCol col="10" md="5 " className="align-items-center justify-content-left">
            <Outlet />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};
