// Cambio de ocntrase;a

import React, { useState } from "react";
import { Modal, Button, ModalHeader } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import Loading from "../templates/Loading";
import alert from "sweetalert";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { Navigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import "./styles.css"

const ModalPswd = () => {
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
          alert({
            title: "Emprende, mensaje del servidor",
            text: "Contraseña actualizada correctamente, Se procedera a cerrar sesión",
            icon: "success",
            buttons: ["Aceptar"],
            timer: 2500,
          }).then(() => {
            Logout();
          });
        });

      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response.data.errors.password) {
        if (error.response.data.errors.password.length === 4) {
          alert({
            title: "Error",
            text: "Ingrese una contraseña valida",
            icon: "error",
            button: false,
            timer: 2000,
          });
        }
        if (error.response.data.errors.password.length === 3) {
          alert({
            title: "Error",
            text: "La contraseña debe contener al menos una mayúscula y una minúscula, La contraseña debe contener al menos 8 caracteres",
            icon: "error",
            button: false,
            timer: 2000,
          });
        } else if (error.response.data.errors.password.length === 2) {
          alert({
            title: "Error",
            text: "La contraseña debe contener al menos una mayúscula y una minúscula",
            icon: "error",
            button: false,
            timer: 2000,
          });
        }
        if (error.response.data.errors.password[0] === "validation.required") {
          alert({
            title: "Error",
            text: "No se puede enviar un formulario vacío ",
            icon: "error",
            button: false,
            timer: 2000,
          });
        } else if (error.response.data.errors.password.length === 1) {
          alert({
            title: "Error",
            text: "Las contraseñas no coinciden, intente nuevamente",
            icon: "error",
            button: false,
            timer: 2000,
          });
        }
      } else if (error.response.data.errors.email === "passwords.token") {
        alert({
          title: "Error",
          text: "El tiempo de espera para cambiar la contraseña ha expirado, realize el proceso nuevamente",
          icon: "error",
          button: false,
          timer: 3000,
        });

        setTimeout(() => {
          Navigate("/login");
        }, 3000);
      } else if (
        error.response.data.errors.password[0] === "validation.confirmed"
      ) {
        alert({
          title: "Error",
          text: "Las contraseñas no coinciden, intente nuevamente",
          icon: "error",
          button: false,
          timer: 2000,
        });
      }
      setLoading(false);
    }
  };

  return (
    <>
      {/* <button className="primary-btn" title="Cambiar contraseña" }>
      <svg width="16" height="16" viewBox="0 0 292 292" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M200.586 0.197144C150.292 0.197144 109.474 41.0155 109.474 91.3096C109.474 97.1408 109.474 102.972 110.567 108.439L0.138916 218.867V291.757H109.474V218.867H182.364V182.422L183.457 181.329C188.924 182.422 194.755 182.422 200.586 182.422C250.88 182.422 291.699 141.604 291.699 91.3096C291.699 41.0155 250.88 0.197144 200.586 0.197144ZM218.809 36.6421C238.854 36.6421 255.254 53.0424 255.254 73.0871C255.254 93.1319 238.854 109.532 218.809 109.532C198.764 109.532 182.364 93.1319 182.364 73.0871C182.364 53.0424 198.764 36.6421 218.809 36.6421Z" fill="#686868"/>
</svg>

      </button> */}
      <Button className='btnedit btn-secondary'  onClick={() => setToggle(true)}><svg width="16" height="16" viewBox="0 0 292 292" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M200.586 0.197144C150.292 0.197144 109.474 41.0155 109.474 91.3096C109.474 97.1408 109.474 102.972 110.567 108.439L0.138916 218.867V291.757H109.474V218.867H182.364V182.422L183.457 181.329C188.924 182.422 194.755 182.422 200.586 182.422C250.88 182.422 291.699 141.604 291.699 91.3096C291.699 41.0155 250.88 0.197144 200.586 0.197144ZM218.809 36.6421C238.854 36.6421 255.254 53.0424 255.254 73.0871C255.254 93.1319 238.854 109.532 218.809 109.532C198.764 109.532 182.364 93.1319 182.364 73.0871C182.364 53.0424 198.764 36.6421 218.809 36.6421Z" fill="#17b3bb"/>
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
