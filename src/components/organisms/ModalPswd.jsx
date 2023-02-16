// Cambio de ocntrase;a

import React, { useState } from "react";
import { Modal, Button, ModalHeader } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import Loading from "../templates/Loading";

import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { Navigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import "./styles.css"
import alert from "sweetalert2";
import X from "../../components/assets/logo_esfot_buho.png"
import withReactContent from 'sweetalert2-react-content';
const ModalPswd = () => {
  const Alerta = withReactContent(alert)
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const [toggle, setToggle] = useState(false);


  const [form, setForm] = useState({
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios
        .post(
          `https://backend-emprende.herokuapp.com/api/v1/update-password`,
          { ...form },
          { headers: { accept: "application/json", authorization: token } }
        )
        .then(() => {

          Alerta.fire({
            title: <p>Atención!</p>,
            text: "Contraseña actualizada correctamente, Se procedera a cerrar sesión",
            icon: "success",
            buttons: ["Aceptar"],
            timer: 2500,
          }).then(() => {
            Logout();
          }
          );
        }).catch((error) => {
          //console.log(error.response.data.errors.password[0]);
          // if (error.response.data.message==="El campo contraseña es obligatorio."){
          //   Alerta.fire({
          //     title: <p>Atención!</p>,
          //     text: "El campo contraseña es obligatorio.",

          //     buttons: ["Aceptar"],
          //     timer: 2500,
          //   })

          // }

          if (error.response.data.errors.password) {
            if (error.response.data.errors.password.length === 4) {
              Alerta.fire({
                title: <p>Atención!</p>,
                html: <div>
                  <p>* Debe ingresar ina contraseña valida.</p>
                </div>,
                //imagen con tamaño 100x100
                imageUrl: X,
                imageHeight: 100,
                imageWidth: "auto",
                imageAlt: 'alertaEPN',
                //boton desactivado

                //tiempo de desaparicion
                timer: 6000,
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
            if (error.response.data.errors.password.length === 3) {
              Alerta.fire({
                title: <p>Atención!</p>,
                html: <div>
                  <p>La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número.</p>
                </div>,
                //imagen con tamaño 100x100
                imageUrl: X,
                imageHeight: 100,
                imageWidth: "auto",
                imageAlt: 'alertaEPN',
                //boton desactivado

                //tiempo de desaparicion
                timer: 6000,
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


            } else if (error.response.data.errors.password[0] === 'The contraseña must contain at least one number.') {
              Alerta.fire({
                title: <p>Atención!</p>,
                html: <div>
                  <p>La contraseña debe contener al menos un número.</p>
                </div>,
                //imagen con tamaño 100x100
                imageUrl: X,
                imageHeight: 100,
                imageWidth: "auto",
                imageAlt: 'alertaEPN',
                //boton desactivado

                //tiempo de desaparicion
                timer: 6000,
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


            } else if (error.response.data.errors.password[0] === 'La confirmación de contraseña no coincide.') {
              Alerta.fire({
                title: <p>Atención!</p>,
                html: <div>
                  <p>Las contraseñas ingresadas no coinciden.</p>
                </div>,
                //imagen con tamaño 100x100
                imageUrl: X,
                imageHeight: 100,
                imageWidth: "auto",
                imageAlt: 'alertaEPN',
                //boton desactivado

                //tiempo de desaparicion
                timer: 6000,
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

            } else if (error.response.data.errors.password[0] === 'La contraseña debe contener más de 8 caracteres') {
              Alerta.fire({
                title: <p>Atención!</p>,
                html: <div>
                  <p> * La contraseña debe tener más de 8 caracteres</p>
                </div>,
                //imagen con tamaño 100x100
                imageUrl: X,
                imageHeight: 100,
                imageWidth: "auto",
                imageAlt: 'alertaEPN',
                //boton desactivado

                //tiempo de desaparicion
                timer: 6000,
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



            else if (error.response.data.errors.password[0] === 'El campo contraseña es obligatorio.') {
              Alerta.fire({
                title: <p>Atención!</p>,
                text: "Debe ingresar una contraseña, todos los campos son obligatorios",
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
          }
        });














    } catch (error) {

    }
  };


  return (
    <>

      <Button className='btnedit btn-secondary' title="Cambiar contraseña" onClick={() => setToggle(true)}><svg width="16" height="16" viewBox="0 0 292 292" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M200.586 0.197144C150.292 0.197144 109.474 41.0155 109.474 91.3096C109.474 97.1408 109.474 102.972 110.567 108.439L0.138916 218.867V291.757H109.474V218.867H182.364V182.422L183.457 181.329C188.924 182.422 194.755 182.422 200.586 182.422C250.88 182.422 291.699 141.604 291.699 91.3096C291.699 41.0155 250.88 0.197144 200.586 0.197144ZM218.809 36.6421C238.854 36.6421 255.254 53.0424 255.254 73.0871C255.254 93.1319 238.854 109.532 218.809 109.532C198.764 109.532 182.364 93.1319 182.364 73.0871C182.364 53.0424 198.764 36.6421 218.809 36.6421Z" fill="#17b3bb" />
      </svg></Button>
      <Modal
        show={toggle}
        onHide={() => setToggle(false)}
        backdrop="static"
        keyboard={false}
      >
        <ModalHeader closeButton>
          Cambiar contraseña
        </ModalHeader>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="password">Nueva contraseña</label>
              <input
                onChange={handleChange}
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm">Confirmar contraseña</label>
              <input
                onChange={handleChange}
                type="password"
                className="form-control"
                id="password_confirmation"
                name="password_confirmation"
              />
            </div>

            <div className="d-flex justify-content-end padding-top-1x mt-2">
              <button type="submit" className="btn btn-primary">
                Actualizar
              </button>
            </div>

          </form>
          <div className="d-flex justify-content-end padding-top-1x mt-4">
            <Grid container spacing={2} >
              <Grid item xs>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{

                    fontFamily: "Montserrat",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}
                >
                  La contraseña debe contener al menos una mayúscula y una
                  minúscula.


                  La contraseña debe contener al menos 8 caracteres.
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalPswd;
