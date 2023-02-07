// Cambio de ocntrase;a

import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import Loading from "../templates/Loading";
import alert from "sweetalert";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { Navigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { border, Box } from "@mui/system";

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
            //Logout();
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
      <Button className="btn" onClick={() => setToggle(true)}>
        Cambiar contraseña
      </Button>
      <Modal
        show={toggle}
        onHide={() => setToggle(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cambiar contraseña</Modal.Title>
        </Modal.Header>
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
