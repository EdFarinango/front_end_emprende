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
  const [admins, setAdmin] = useState([]);
  const { user } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([]);

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
      //console.log(error);
    }

  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <div>
      <button className="primary-btn" onClick={toggle} title="Ver información del usuario">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z" />
          <path d="M12.0001 20.2702C15.5301 20.2702 18.8201 18.1902 21.1101 14.5902C22.0101 13.1802 22.0101 10.8102 21.1101 9.40021C18.8201 5.80021 15.5301 3.72021 12.0001 3.72021C8.47009 3.72021 5.18009 5.80021 2.89009 9.40021C1.99009 10.8102 1.99009 13.1802 2.89009 14.5902C5.18009 18.1902 8.47009 20.2702 12.0001 20.2702Z" />
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
