import React from "react";
import { Outlet } from "react-router-dom";
import './style.css'

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

export const AuthRecovery = () => {
  return (
    <>
      <MDBContainer fluid className="p-10 my-5 h-custom ">
     
          <MDBCol className="d-flex justify-content-center">
          <div className="w3-card w3-round w3-white w3-padding-16 w3-center d-flex justify-content-center">
          <img
              src="https://ciberprotector.com/wp-content/uploads/2019/05/gestor-contrasen%CC%83as-ciberprotector-268x300.png"
              className="img-rcovery"
              alt="Sample image"
              
            />

               <Outlet />
               
            </div>
           
            
          </MDBCol>

         
   
      </MDBContainer>
    </>
  );
};
