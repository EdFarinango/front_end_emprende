import React, { useState, useEffect } from "react";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";






const EditFormNew = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    parsonal_phone: "",
    linkedin: "",
    state: "1"



  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const token = localStorage.getItem('token');

  const validationsForm = (form) => {
    let errors = {};
    let regexName = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
    let regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/; // 4 a 12 digitos.
    let regexPhone = /^\d{7,10}$/; // 7 a 14 numeros.

    if (!form.first_name) {
      errors.first_name = "Name is required";
    } else if (!regexName.test(form.name)) {
      errors.name = "Name is not valid";
    } else if (!form.last_name) {
      errors.last_name = "Last Name is required";
    } else if (!regexName.test(form.last_name)) {
      errors.last_name = "Last Name is not valid";
    } else
      if (!form.email) {
        errors.email = "Email is required";
      } else if (!regexEmail.test(form.email)) {
        errors.email = "Email is not valid";
      } else


        if (!form.password) {
          errors.password = "Password is required";
        } else if (!regexPassword.test(form.password)) {
          errors.password = "Password is not valid";
        } else

          if (!form.personal_phone) {
            errors.personal_phone = "Personal Phone is required";
          }
          else if (!regexPhone.test(form.personal_phone)) {
            errors.personal_phone = "Personal Phone is not valid";
          } else

            if (!form.linkedin) {
              errors.linkedin = "Linkedin is required";

            }





    return errors;






  };



  const handleBlur = (e) => {
    console.log(form);
    handleChange(e);
    setErrors(validationsForm(form));


  }

  const handleSubmit = (e) => {

    e.preventDefault();
    setErrors(validationsForm(form));


    if (Object.keys(errors).length === 0) {
      console.log("No hay errores");
      setLoading(true);
      console.log(form);
      try {


        axios.post(
          `https://backend-emprende.herokuapp.com/api/v1/superadmin/create`,
          { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
        ).then((respose) => {

          console.log(respose);
          setLoading(false);
          setResponse(true);
          setTimeout(() => {
            setResponse(false)
          }, 2500);
        }).catch((err) => {
          console.log(err);
          setLoading(false);
          setResponse(false);
        }
        );

      } catch (error) {
        console.log(error);
        setLoading(false);
        setResponse(false);
      }
    }





    else {
      console.log("Hay errores");
    }









  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  }



  return (
    <>
      <h1>Formulario de Registro</h1>

      <Form onSubmit={handleSubmit}>



        <FormGroup>
          <Label for="first_name">Nombre</Label>
          <Input
            autoComplete="false"
            type="text"
            name="first_name"
            id="first_name"
            onChange={handleChange}
            onBlur={handleBlur}


            value={form.first_name}


            required



          />
          {errors.first_name && <p>{errors.first_name}</p>}
        </FormGroup>
        <FormGroup>
          <Label for="last_name">Apellido</Label>
          <Input
            autoComplete="false"
            type="text"
            name="last_name"
            id="last_name"
            onChange={handleChange}
            value={form.last_name}
          />
          {errors.last_name && <p>{errors.last_name}</p>}

        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            autoComplete="false"
            type="email"
            name="email"
            id="email"
            onBlur={handleBlur}
            onChange={handleChange}

            required
            value={form.email}
          />
          {errors.email && <p>{errors.email}</p>}
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            autoComplete="false"
            type="password"
            name="password"
            id="password"
            onBlur={handleBlur}
            onChange={handleChange}

            required
            value={form.password}
          />
          {errors.password && <p>{errors.password}</p>}
        </FormGroup>

        <FormGroup>
          <Label for="personal_phone">Personal Phone</Label>
          <Input
            autoComplete="false"
            type="text"
            name="personal_phone"
            id="personal_phone"
            onBlur={handleBlur}
            onChange={handleChange}

            required
            value={form.personal_phone}
          />
          {errors.personal_phone && <p>{errors.personal_phone}</p>}
        </FormGroup>
        <FormGroup>
          <Label for="linkedin">Linkedin</Label>
          <Input
            autoComplete="false"
            type="text"
            name="linkedin"
            id="linkedin"
            onBlur={handleBlur}
            onChange={handleChange}

            required
            value={form.linkedin}
          />
          {errors.linkedin && <p>{errors.linkedin}</p>}
        </FormGroup>






        <Button color="info" >Enviar</Button>

      </Form>





    </>
  );


}

export default EditFormNew;
