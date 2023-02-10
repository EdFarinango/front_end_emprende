import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts";
import FormInput from "../templates/Inputs";
import alert from "sweetalert";

import Container from "react-bootstrap/Container";

const ModalAvatar = (props) => {
  const [admin, setAdmin] = useState([]);
  const token = localStorage.getItem("token");
  const [error, setError] = useState(false);

  const [image, setImage] = useState(null);
  const { user } = useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const formData = new FormData();
  formData.append("image", image);

  const handleUpload = (e) => {
    e.preventDefault();

    axios
      .post(
        `https://backend-emprende.herokuapp.com/api/v1/profile/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);

        if (response.data.message === "Avatar updated successfully") {
          alert({
            title: "Foto de perfil actualizada!",
            icon: "success",
            timer: 2000,
            button: false,
          });
        }

        setTimeout(() => {
          window.location = window.location.href;
        }, 1000);
      })

      .catch((error) => {
        //console.log(error);
      });
  };

  const inputImg = [
    {
      id: 1,
      name: "image",
      type: "file",
      placeholder: "Imagen",
      errorMessage: "Debe ingresar una imagen válida!",
      label: "Imagen",
      pattern: "^[jpe?g|png|gif|bmp]{3,16}$",
    },
  ];

  return (
    <>
      <Button  onClick={toggle}>
       
      </Button>

      <Modal isOpen={modal} toggle={toggle} size="ls">
        <ModalHeader toggle={toggle}>EmPreNde</ModalHeader>
        <ModalBody className="show-grid">
          <Container>
            <Form className="form-control">
              

              <FormGroup>
                {inputImg.map((inputImg) => (
                  <FormInput
                    key={inputImg.id}
                    {...inputImg}
                    value={formData[inputImg.name]}
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                ))}
                <Button
                  color="info"
                  onClick={handleUpload}
                  item={admin}
                  admins={admin}
                >
                  {" "}
                  Subir imagen{" "}
                </Button>
              </FormGroup>
            </Form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalAvatar;
