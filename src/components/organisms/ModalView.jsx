import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

import InputLabel from "@mui/material/InputLabel";
import { Form, FormGroup, Label, Input } from "reactstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Row from "react-bootstrap/Row";
import { NativeSelect } from "@mui/material";

const ModalViewEmp = ({ emprendimientos }) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const toggle = () => setModal(!modal);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/emprendimiento/${emprendimientos.id}`,
        { headers: { accept: "application/json", authorization: token } }
      );

      setData(response.data.data.emprendimiento);
      //console.log(response.data.data.emprendimiento);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Button className="btnedit" onClick={toggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-eye-fill"
          viewBox="0 0 16 16"
        >
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
        </svg>
      </Button>

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>EmPreNde</ModalHeader>
        <ModalBody className="show-grid">
          <Container>
            <div>
              <div className="w3-container w3-card w3-white w3-round w3-margin">
                <br />
                <img
                  src="https://www.w3schools.com/w3images/avatar2.png"
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
                <h4>{data.nombre}</h4>
                <br />
                <hr className="w3-clear" />

                <div className="w3-row-padding" style={{ margin: "0 -16px" }}>
                  <div className="w3-half">
                    <p className="w3-opacity">Descripcion</p>
                    <p>{data.descripcion}</p>
                    <p className="w3-opacity">Direccion</p>
                    <p>{data.direccion}</p>
                    <p className="w3-opacity">Telefono</p>
                    <p>{data.telefono}</p>

                    <p className="w3-opacity">Sitio Web</p>
                    <p>{data.pagina_web}</p>
                    <p className="w3-opacity">Facebook</p>
                    <p>{data.facebook}</p>
                    <p className="w3-opacity">Instagram</p>
                    <p>{data.instagram}</p>
                    <p className="w3-opacity">Whatsapp</p>
                    <p>{data.whatsapp}</p>
                    <p className="w3-opacity">Categoria</p>
                    <p>{data.categoria}</p>
                    <p className="w3-opacity">Cobertura</p>
                    <p>{data.cobertura}</p>
                    <p className="w3-opacity">Estado del emprendimiento</p>
                    <p>
                      {data.estado === 1 ? (
                        <span className="badge bg-success">Activo</span>
                      ) : (
                        <span className="badge bg-danger">Inactivo</span>
                      )}
                    </p>
                  </div>
                  <div className="w3-half">
                    <img
                      src={data.image}
                      style={{ width: "100%", height: "100%" }}
                      alt="Northern Lights"
                      className="w3-margin-bottom"
                    />
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

export default ModalViewEmp;
