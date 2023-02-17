import React, { useState, useEffect, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts";
import FormInput from "./Inputs";
import alert from "sweetalert";
import { get } from "react-hook-form";



const EditForm = (props) => {



  const [admin, setAdmin] = useState([]);
  const token = localStorage.getItem('token');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const { user } = useContext(AuthContext);







  const [form, setForm] = useState(
    {


      id: props.item?.id ?? "",
      first_name: props.item?.first_name ?? "",
      last_name: props.item?.last_name ?? "",
      email: props.item?.email ?? "",
      personal_phone: props.item?.Teléfono ?? "",
      linkedin: props.item?.LinkedIn ?? "",
      state: props.item?.state ?? "",




    }
  );




  const FormEdit = async (e) => {

    e.preventDefault();

    if (Object.values(form).includes("")) {
      //console.log(e);
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2500);
      return;
    }

    try {

      await axios.post(
        `https://backend-emprende.herokuapp.com/api/v1/admin/${props.item.id}/update`,
        { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
      ).then(response => {
        alert({
          title: "Información del usuario actualizada!",
          icon: "success",
          timer: 2000,
          button: false,

        })
        setTimeout(() => {
          window.location.reload();
        }, 1000);



      })
        .catch(error => {


          if (error.response.data.errors.email) {
            alert({
              title: "Error al registar usuario",
              text: "El correo electrónico ya esta registrado en el sistema",
              icon: "error",
              button: false,
              timer: 2500,
            });
          }
        }


        );








    } catch (error) {
      //console.log(error);
    }


  }


  const handleUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    axios.post(`https://backend-emprende.herokuapp.com/api/v1/profile/avatar`, formData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    }

    ).then(response => {

      //console.log(response.data.message);

      if (response.data.message === 'Avatar updated successfully') {
        alert({
          title: "Foto de perfil actualizada!",
          icon: "success",
          timer: 2000,
          button: false,
        })
      }


      setTimeout(() => {
        window.location = window.location.href;
      }, 1000);




    })

      .catch(error => {
        ////console.log(error);
      });
  }


  const inputs = [
    {
      id: 1,
      name: "first_name",
      type: "text",
      placeholder: "Ingrese el nombre",
      errorMessage: "Debe ingresar un nombre válido!",
      label: "Username",
      pattern:  "^[a-zA-ZÀ \s,-áéíóúÁÉÍÓÚñÑ]{3,255}$",
      required: true,

    },
    {
      id: 2,
      name: "last_name",
      type: "text",
      placeholder: "Ingrese el apellido",
      errorMessage: "Debe ingresar un apellido válido!",
      label: "Apellido",
      pattern: "^[a-zA-ZÀ \s,-áéíóúÁÉÍÓÚñÑ]{3,255}$",
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
      name: "personal_phone",
      type: "text",
      placeholder: "Teléfono",
      errorMessage: "Ingreser un teléfono válido de hasta 10 dígitos!",
      label: "Teléfono personal",
      pattern: "^[0-9]{9,10}$",

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
    }

  ];

  const inputImg = [
    {
      id: 1,
      name: "image",
      type: "file",
      placeholder: "Imagen",
      errorMessage: "Debe ingresar una imagen válida!",
      label: "Imagen",
      pattern: "^[jpe?g|png|gif|bmp]{3,16}$",

    }
  ]

 
  const getAdmin = async () => {

    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/admin`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );

      setAdmin(response.data.data.users)


    } catch (error) {
      ////console.log(error);
    }
  }





  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


















  return (
    <Form onSubmit={FormEdit} className="form-control">
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

      <Button color="info" type="submit" item={admin} admins={admin}  >

        Guardar
      </Button>
      {props.item.id === user.id &&
        <FormGroup>
          {inputImg.map((inputImg) => (
            <FormInput
              key={inputImg.id}
              {...inputImg}
              value={form[inputImg.name]}
              onChange={(e) => setImage(e.target.files[0])}
            />
          ))}
          <Button color="info" onClick={handleUpload} item={admin} admins={admin}  > Subir imagen </Button>
        </FormGroup>


      }

    </Form>
  );

}

export default EditForm;
