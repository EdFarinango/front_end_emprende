// Cambio de ocntrase;a

import React, { useState } from "react";
import { Modal,  ModalHeader } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";


import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";

import { Grid, Typography } from "@mui/material";
import "./styles.css"
import alert from "sweetalert2";
import X from "../../components/assets/logo_esfot_buho.png"
import withReactContent from 'sweetalert2-react-content';
import { Button } from "reactstrap";


const ModalPswd = () => {
  const Alerta = withReactContent(alert)
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [tokeSesion, setTokenSesion] = useState([]);
  const { logout } = useContext(AuthContext);


  const [toggle, setToggle] = useState(false);


  const [form, setForm] = useState({
    password: "",
    password_confirmation: "",
  });

  const handleLogout = async () => {

    try {
      await axios.post(
        'https://backend-emprende.herokuapp.com/api/v1/logout',
        {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`  } }
      );
   
      logout();
    } catch (error) {
      logout();

    }


  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
   // window.location.href = "/";

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
            handleLogout();
            logout();
          }
          );
        }).catch((error) => {



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

      <button className='primary-btn' title="Cambiar contraseña" onClick={() => setToggle(true)}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.88966 17.49L9.18966 19.79M19.7897 14.93C18.8131 15.9041 17.5892 16.5931 16.2499 16.9226C14.9106 17.2521 13.5067 17.2098 12.1897 16.8L7.47966 21.5C7.13966 21.85 6.46966 22.06 5.98966 21.99L3.80966 21.69C3.08966 21.59 2.41966 20.91 2.30966 20.19L2.00966 18.01C1.93966 17.53 2.16966 16.86 2.49966 16.52L7.19966 11.82C6.39966 9.22001 7.01966 6.27001 9.07966 4.22001C12.0297 1.27001 16.8197 1.27001 19.7797 4.22001C22.7397 7.17001 22.7397 11.98 19.7897 14.93Z" />
<path d="M14.5 11C14.8978 11 15.2794 10.842 15.5607 10.5607C15.842 10.2794 16 9.89782 16 9.5C16 9.10218 15.842 8.72064 15.5607 8.43934C15.2794 8.15804 14.8978 8 14.5 8C14.1022 8 13.7206 8.15804 13.4393 8.43934C13.158 8.72064 13 9.10218 13 9.5C13 9.89782 13.158 10.2794 13.4393 10.5607C13.7206 10.842 14.1022 11 14.5 11Z" />
</svg>
</button>
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
              <Button type="submit"  className="subir">
                Actualizar
              </Button>
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
