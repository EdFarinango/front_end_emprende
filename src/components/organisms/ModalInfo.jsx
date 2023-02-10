import React, { useState } from "react";
import {
 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,

} from "reactstrap";
import { Button } from "react-bootstrap";

import axios from "axios";
import { useEffect } from "react";

import { useContext } from "react";
import Container from "react-bootstrap/Container";
import { AuthContext } from "../../contexts/auth/AuthContext";

import "./styles.css";



const ModalInfo = () => {
  const [modal, setModal] = useState(false);

  const token = localStorage.getItem("token");
  const toggle = () => setModal(!modal);
  const [admins , setAdmin] = useState([]);
  const { user } = useContext(AuthContext);
  const[avatar , setAvatar] = useState([]);

  const getAdmin = async () => {
  
    try {
      const response = await axios.get(
       
        `https://backend-emprende.herokuapp.com/api/v1/profile`,
        { headers: { accept: "application/json", authorization: token } }
      );

      ///revisar  updateState(response.data.data.users)

        setAdmin(response.data.data.user);
        setAvatar(response.data.data.avatar);
      console.log(response.data.data.avatar);
   
    } catch (error) {
      console.log(error);
    }
    
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <div>
       <button className="primary-btn" onClick={toggle} title="Ver información del usuario">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-eye-fill"
          viewBox="0 0 16 16"
        
         
        >
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" fill="#686868" />
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" fill="#686868" />
        </svg>
      </button>

      <Modal isOpen={modal} toggle={toggle} size="ls">
        <ModalHeader toggle={toggle}>EmPreNde</ModalHeader>
        <ModalBody className="show-grid">
          <Container>
            <div>
              <div className="w3-container w3-card w3-white w3-round w3-margin">
                <br />
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w3-left w3-circle w3-margin-right"
                  style={{ width: "60px" }}
                />
                <span className="w3-right w3-opacity">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-calendar3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm2-1a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2z" />

                    <path d="M2 7v5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7H2z" />
                  </svg>
                </span>
                
                <br />
                <br />
                <hr className="w3-clear" />

                <div className="w3-row-padding" style={{ margin: "0 -16px" }}>
                  <div className="w3-half">

                    <p className="w3-opacity">Nombre</p>
                    <p>{admins.first_name}</p>
                    <p className="w3-opacity">Apellido</p>
                    <p>{admins.last_name}</p>
                    <p className="w3-opacity">Email</p>
                    <p>{admins.email}</p>
                    <p className="w3-opacity">Telefono</p>
                    <p>{admins.Teléfono}</p>
                    <p className="w3-opacity">LinkedIn</p>

                    <p>{admins.LinkedIn}</p>
                                       <p>
                      {admins.state === 1 ? (
                        <span className="badge bg-success">Activo</span>
                      ) : (
                        <span className="badge bg-danger">Inactivo</span>
                      )}
                    </p>

                    
                   
                     
                  </div>
                </div> 
              </div>
            </div>
            
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalInfo;
