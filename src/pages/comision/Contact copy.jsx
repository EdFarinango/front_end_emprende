import React, { Component } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './style.css';


export default function Contact(props) {



  return (
    <div>



      {/* 
      <div className="contact">
        <h1 className="name">{props.name}</h1>
        <img className="img" src={props.img} alt={props.name}/>
        <p className="descripcion">{props.descripcion}</p>
        <p className="email">{props.email}</p>
      </div> 
      
      
      <MDBContainer className="py-5">
      <MDBRow  className="justify-content-center align-items-center h-100">
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center img align-items-center" >
               
          
                <MDBCardImage
                  src={props.img}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px' }}
                                    fluid />
                  <MDBCardText
                  className="text-uppercase text-muted mb-3"
                  style={{ fontSize: '0.7rem', marginTop: '1rem', marginBottom: '1rem' }}
                >
                  {props.name}
                </MDBCardText>
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer> */}



      


        <div className="row">
         
          
              <div className="card-body">
      <div className="profile-card">
        <div className="profile-type"> Esfot </div>
        <div className="avatar">
          <img src={props.img} alt={props.name} />
        </div>
        <div className="details">{props.name}</div>
        <div className="details">{props.descripcion}</div>
        <div className="social">
          <div className="details">{props.email}</div>
        </div>
      </div>
      </div>
            </div>
          </div>




















  

























  );
}