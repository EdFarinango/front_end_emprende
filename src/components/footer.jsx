import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import "./styles.css";
import { Box, Typography } from "@mui/material";
import {
  Row,
  Col,
  Card,
  OverlayTrigger,
  Tooltip,
  Image,
  Button,
} from "@themesberg/react-bootstrap";
import Logo from "../components/assets/buho.png";
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
     

      <footer className="footerLand">
       
        <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-2">
         
            
           
      
    
            <ul className="list-inline list-group-flush list-group-borderless text-center text-xl-right mb-0">
            < div className="imagecontainer">
            <Image
             
             src={Logo}
             alt="logo-emprende"
            
             position="center"
             className="imageFooter"
           />
            </div>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link
                  href="https://emprende-esfot.vercel.app/comision"
                  target="_blank"
                  className="linktext"
                  rel="noreferrer"
                >
                  Nosotros
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link
                  href="https://www.epn.edu.ec/"
                  target="_blank"
                  className="linktext"
                >
                  EPN
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link
                  href="https://www.facebook.com/people/ESFOT-EPN-UIO/100063704537871/"
                  target="_blank"
                  className="linktextFb"
                  rel="noreferrer"
                >
                  <FacebookIcon />
                </Card.Link>
              </li>
              
              <li className="list-inline-item px-0 px-xl-2 ">
                <Card.Link
                  href="https://www.youtube.com/@esfot_epn3790"
                  target="_blank"
                  className="linktext"
                  rel="noreferrer"
                >
                  <i class="fa fa-youtube" aria-hidden="true"></i>
                </Card.Link>
              </li>
            </ul>
          </Col>

          <Col xs={12} lg={6} className="mb-4 mb-lg-0 ">
            <Row>
              <Col xs={12} lg={6} className="mb-4 mb-lg-0 ">
                <p className="mb-0 text-center text-xl-right textUb">
                  Ubicaci??n
                </p>
                <div className="mapa">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7913376228116!2d-78.49234128552739!3d-0.21071923501412979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a1075e0872b%3A0x44b1552c38388024!2sESFOT%20EPN%2C%20Toledo%2C%20Quito%20170143!5e0!3m2!1ses!2sec!4v1675908176114!5m2!1ses!2sec"
                  width={400}
                  height="auto"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  titulo = "mapa"
                />
              </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center">
            <p className="mb-0 text-center text-xl-left">
              Copyright ?? 2019-{`${currentYear} `}
              <Card.Link
                href="https://esfot.epn.edu.ec/index.php/comision-emprende"
                target="_blank"
                className="linktext  text-xl text-decoration-none"
              >
                ESFOT EmPreNde.
              </Card.Link>
            </p>
          </Col>
        </Row>
      </footer>
    </>
  );
}

export default Footer;
