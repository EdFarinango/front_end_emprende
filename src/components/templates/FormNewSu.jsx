import React, { useState  } from "react";

import { Button, Form, FormGroup, Label, Input } from "react-bootstrap";
import axios from "axios";
import alert from "sweetalert";
import FormInput from "./Inputs";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
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
      label: "Username",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    
    },
    {
      id: 2,
      name: "last_name",
      type: "text",
      placeholder: "Ingrese el apellido",
      errorMessage: "Debe ingresar un apellido válido!",
      label: "Apellido",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
  
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email no válido!",
      label: "Email",
      pattern: "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$",
      required: true,
     
    },

    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "La contraseña debe tener entre 4 y 12 caracteres, al menos un dígito, una minúscula, una mayúscula y un simbolo",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,12}$`,
      required: true,
   
    },
    {
      id: 5,
      name: "personal_phone",
      type: "text",
      placeholder: "Teléfono",
      errorMessage: "Solamente se aceptan números de 9 a 10 dígitos",
      label: "Teléfono personal",
      pattern: "^[0-9]{9,10}$",
  
      required: true,
    },

    {
      id: 6,
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
        })
        .catch((err) => {
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
      console.log(error);
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

        <Button color="info" type="submit">
         
          Crear
        </Button>
        <Button color="danger" onClick={reset}>
        
          Limpiar
        </Button>
      </Form>
      <br />
    </>
  );
};

export default EditFormNew;
