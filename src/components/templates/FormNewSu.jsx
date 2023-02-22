import React, { useState } from "react";

import { Button, Form, FormGroup, Label, Input } from "react-bootstrap";
import axios from "axios";
import alert from "sweetalert";
import FormInput from "./Inputs";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",

  personal_phone: "",
  linkedin: "",
  state: "1",
};
const EditFormNew = () => {
  const [form, setForm] = useState({
    initialState,
  });





  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const inputs = [
    {
      id: 1,
      name: "first_name",
      type: "text",
      placeholder: "Ingrese el nombre",
      errorMessage: "Debe ingresar un nombre válido!",
      label: "Nombre del administrador",
      pattern: "^[a-zA-ZÀ \s,-áéíóúÁÉÍÓÚñÑ]{3,255}$",
      required: true,

    },
    {
      id: 2,
      name: "last_name",
      type: "text",
      placeholder: "Ingrese el apellido",
      errorMessage: "Debe ingresar un apellido válido!",
      label: "Apellido del administrador",
      pattern: "^[a-zA-ZÀ \s,-áéíóúÁÉÍÓÚñÑ]{3,255}$",
      required: true,

    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email no válido!",
      label: "Correo Electrónico",
      pattern: "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$",
      required: true,

    },


    {
      id: 4,
      name: "personal_phone",
      type: "text",
      placeholder: "Teléfono",
      errorMessage: "Solamente se aceptan números de hasta 10 dígitos",
      label: "Teléfono personal",
      pattern: "^[0-9]{10}$",

      required: true,
    },

    {
      id: 5,
      name: "linkedin",
      type: "text",
      placeholder: "Linkedin",
      errorMessage: "",
      label: "Linkedin",
      pattern: null,

      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      axios
        .post(
          `https://backend-emprende.herokuapp.com/api/v1/superadmin/create`,
          { ...form },
          { headers: { accept: "application/json", authorization: token } }
        )
        .then((respose) => {
          alert({
            title: "Registro Exitoso",
            text: "Usuario registrado correctamente",
            icon: "success",
            button: false,
            timer: 2000,
          });

          setData(respose.data);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((err) => {
          //console.log(err.response.data.errors);
          if (err.response.data.errors.email) {
            alert({
              title: "Error al registar usuario",
              text: "El correo electrónico ya esta registrado en el sistema",
              icon: "error",
              button: false,
              timer: 2500,
            });
          }
        });
    } catch (error) {
      //console.log(error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const reset = () => {
    setForm(initialState);
  };

  return (
    <>
      <h1>Formulario de Registro</h1>

      <Form onSubmit={handleSubmit} className="form-control">
        <FormGroup>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={form[input.name]}
              onChange={onChange}
            />
          ))}
        </FormGroup>
       <div className="d-flex justify-content-center">
               <Button className="subir" type="submit">

          Crear
        </Button>
        <Button className="subir" onClick={reset}>

          Limpiar
        </Button>
        </div>
      </Form>
      <br />
    </>
  );
};

export default EditFormNew;
