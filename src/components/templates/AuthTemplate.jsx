import React from 'react';
import { Outlet } from 'react-router-dom';


import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

import '../../components/templates/style.css';




export const AuthTemplate = () => {

   

    

    return (
        <>



        
        

   
        
        <MDBContainer fluid className="p-3 my-5 h-custom">

<MDBRow>

  <MDBCol col='10' md='6'>
    <img src="https://www.espaciodelemprendedor.cl/img/ede/home-01.png" class="img-fluid" alt="Sample image" />
  </MDBCol>

  <MDBCol col='10' md='4'>

  <Outlet/>

   

  </MDBCol>

</MDBRow>



</MDBContainer>
          
        </>
    )
}
