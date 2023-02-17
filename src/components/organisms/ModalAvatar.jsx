import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Form,
  FormGroup,

  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import axios from "axios";

import { AuthContext } from "../../contexts";
import FormInput from "../templates/Inputs";


import Container from "react-bootstrap/Container";
import "./styles.css"
import alert from "sweetalert2";

import withReactContent from 'sweetalert2-react-content';
import X from "../../components/assets/logo_esfot_buho.png"

const ModalAvatar = (props) => {
  const Alerta = withReactContent(alert)
  const [admin, setAdmin] = useState([]);
  const token = localStorage.getItem("token");


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
          Alerta.fire({
            title: <p>Atención!</p>,
            text: "Avatar actualizado exitosamente",
            //imagen con tamaño 100x100
            imageUrl: X,
            imageHeight: 100,
            imageWidth: "auto",
            imageAlt: 'alertaEPN',
            //boton desactivado
            showConfirmButton: false,
            //tiempo de desaparicion
            timer: 3000,
            //color de fondo
            background: '#fff',
            //color de texto
            customClass: {
              title: 'text-dark',
              text: 'text-dark',
              popup: 'bg-light',
              icon: 'bg-light'
            }


          })
        }

        setTimeout(() => {
          window.location = window.location.href;
        }, 1000);
      })

      .catch((error) => {
        //console.log("aqui",error.response.data.message);
        console.log("aqui", error.response.data.errors.image.length);
        if (error.response.data.errors.image.length === 2) {
          Alerta.fire({
            title: <p>Atención!</p>,
            text: "Debe seleccionar una imagen",
            //imagen con tamaño 100x100
            imageUrl: X,
            imageHeight: 100,
            imageWidth: "auto",
            imageAlt: 'alertaEPN',
            //boton desactivado
            showConfirmButton: false,
            //tiempo de desaparicion
            timer: 3000,
            //color de fondo
            background: '#fff',
            //color de texto
            customClass: {
              title: 'text-dark',
              text: 'text-dark',
              popup: 'bg-light',
              icon: 'bg-light'
            }


          })

        }

        if (error.response.data.message === 'El campo image no debe ser mayor que 512 kilobytes.') {
          Alerta.fire({
            title: <p>Atención!</p>,
            text: "El peso de la imagen no debe ser mayor a 512 kilobytes",
            //imagen con tamaño 100x100
            imageUrl: X,
            imageHeight: 100,
            imageWidth: "auto",
            imageAlt: 'alertaEPN',
            //boton desactivado
            showConfirmButton: false,
            //tiempo de desaparicion
            timer: 3000,
            //color de fondo
            background: '#fff',
            //color de texto
            customClass: {
              title: 'text-dark',
              text: 'text-dark',
              popup: 'bg-light',
              icon: 'bg-light'
            }


          })

        } else if (error.response.data.message === "El campo image debe ser una imagen.") {
          Alerta.fire({
            title: <p>Atención!</p>,
            text: "Debe seleccionar una imagen",
            //imagen con tamaño 100x100
            imageUrl: X,
            imageHeight: 100,
            imageWidth: "auto",
            imageAlt: 'alertaEPN',
            //boton desactivado
            showConfirmButton: false,
            //tiempo de desaparicion
            timer: 3000,
            //color de fondo
            background: '#fff',
            //color de texto
            customClass: {
              title: 'text-dark',
              text: 'text-dark',
              popup: 'bg-light',
              icon: 'bg-light'
            }
          })
        }





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
      <button onClick={toggle} className="primary-btn" title="Cambiar foto de perfil" >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.6799 16.96L18.5499 9.65C17.4899 7.17 15.5399 7.07 14.2299 9.43L12.3399 12.84C11.3799 14.57 9.58993 14.72 8.34993 13.17L8.12993 12.89C6.83993 11.27 5.01993 11.47 4.08993 13.32L2.36993 16.77C1.15993 19.17 2.90993 22 5.58993 22H18.3499C20.9499 22 22.6999 19.35 21.6799 16.96ZM6.96993 8C7.76558 8 8.52864 7.68393 9.09125 7.12132C9.65386 6.55871 9.96993 5.79565 9.96993 5C9.96993 4.20435 9.65386 3.44129 9.09125 2.87868C8.52864 2.31607 7.76558 2 6.96993 2C6.17428 2 5.41121 2.31607 4.84861 2.87868C4.286 3.44129 3.96993 4.20435 3.96993 5C3.96993 5.79565 4.286 6.55871 4.84861 7.12132C5.41121 7.68393 6.17428 8 6.96993 8Z" stroke="withe" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

      </button>

      <Modal isOpen={modal} toggle={toggle} size="ls">
        <ModalHeader toggle={toggle}><p className="inline colorRed">E</p><p className="inline colorAzul">m</p><p className="inline colorRed">P</p><p className="inline colorAzul">re</p><p className="inline colorRed">N</p><p className="inline colorAzul">de</p></ModalHeader>
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
                  className="subir"

                  onClick={handleUpload}
                  item={admin}
                  admins={admin}
                >

                  Subir imagen
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
