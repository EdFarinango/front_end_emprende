import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Image, Button, Container } from '@themesberg/react-bootstrap';

import Logo from "../components/assets/logo.svg";
import GetStarted from '../utils/get-started';
import "./styles.css"

const Main = () => {
    return (

        
        
        <section className="d-flex align-items-center justify-content-center contenedorLand">
          <Container>
            <Row className="align-items-center">
              <Col xs={12} lg={5} className="order-2 order-lg-1 text-center text-lg-left">
                <h1 className="black mt-5">
                Comisión Emprende <span className="fw-bolder">ESFOT</span>
            </h1>
                <p className="bold my-4">
                Buscamos impulsar la generación de emprendimientos en la comunidad ESFOT.
            </p>
            <GetStarted />

                  
              </Col>
              <Col xs={12} lg={7} className="order-1 order-lg-2 text-center d-flex align-items-center justify-content-center">
                <Image className="working-illustration" src={Logo} alt="logo-emprende"  width="220" height="240"
                
                
                
                /> 
              </Col>
            </Row>
          </Container>
        </section>
   
    );
}

export default Main;

