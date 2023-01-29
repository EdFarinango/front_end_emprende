// const initialState = {
//   first_name: "",
//   last_name: "",
//   email: "",
//   password: "",
//   personal_phone: "",
//   linkedin: "",
//   state: "1",
// };
// const EditFormNew = () => {
//   const [form, setForm] = useState({
//     initialState
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState(null);
//   const [data , setData] = useState([]);
//   const token = localStorage.getItem("token");
//   let valid = "";
//  const span = document.querySelector("span");
//  const [nombre, setNombre] = useState({campo : "", valido : null});




const validationsForm = (form) => {
  let errors = {};
  

  let regexName = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.

  let regexEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  let regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/; // 4 a 12 digitos.
  let regexPhone = /^\d{9,10}$/; // 7 a 10 numeros.

  if (!form.first_name) {
    span.className = "error";


    errors.first_name = "El nombre del usuario debe ser ingresado";
  } else if (!regexName.test(form.first_name) || form.first_name.length < 4) {
    span.className = "errors";

    errors.first_name = "El nombre del usuario no es valido";
  } else if (!form.last_name) {
    errors.last_name = "El apellido del usuario debe ser ingresado";
  } else if (!regexName.test(form.last_name || form.last_name.length < 4)) {
    errors.last_name = "El apellido del usuario no es valido";
  } else if (!form.email) {
    errors.email = "El email del usuario debe ser ingresado";
  } else if (!regexEmail.test(form.email) || form.email.length < 4) {
    errors.email = "El email del usuario no es valido";
  } else if (!form.password) {
    errors.password = "La contraseña del usuario debe ser ingresada";
  } else if (!regexPassword.test(form.password)) {
    errors.password = "La contraseña del usuario no es valida";
  }else

  if (!form.personal_phone) {
    errors.personal_phone = "El telefono del usuario debe ser ingresado";
  } else if (!regexPhone.test(form.personal_phone)) {
    errors.personal_phone = "El telefono del usuario no es valido";
  }

  return errors;
};


const handleBlur = (e) => {
  setErrors(validationsForm(form));
  handleChange(e);
};










//   const validationsForm = (form) => {
//     let errors = {};
    

//     let regexName = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.

//     let regexEmail =
//       /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
//     let regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/; // 4 a 12 digitos.
//     let regexPhone = /^\d{9,10}$/; // 7 a 10 numeros.

//     if (!form.first_name) {
//       span.className = "error";


//       errors.first_name = "El nombre del usuario debe ser ingresado";
//     } else if (!regexName.test(form.first_name) || form.first_name.length < 4) {
//       span.className = "errors";

//       errors.first_name = "El nombre del usuario no es valido";
//     } else if (!form.last_name) {
//       errors.last_name = "El apellido del usuario debe ser ingresado";
//     } else if (!regexName.test(form.last_name || form.last_name.length < 4)) {
//       errors.last_name = "El apellido del usuario no es valido";
//     } else if (!form.email) {
//       errors.email = "El email del usuario debe ser ingresado";
//     } else if (!regexEmail.test(form.email) || form.email.length < 4) {
//       errors.email = "El email del usuario no es valido";
//     } else if (!form.password) {
//       errors.password = "La contraseña del usuario debe ser ingresada";
//     } else if (!regexPassword.test(form.password)) {
//       errors.password = "La contraseña del usuario no es valida";
//     }else

//     if (!form.personal_phone) {
//       errors.personal_phone = "El telefono del usuario debe ser ingresado";
//     } else if (!regexPhone.test(form.personal_phone)) {
//       errors.personal_phone = "El telefono del usuario no es valido";
//     }

//     return errors;
//   };

//   const handleBlur = (e) => {
//     setErrors(validationsForm(form));
//     handleChange(e);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors(validationsForm(form));

//     if (Object.keys(errors).length === 0) {
//       console.log("No hay errores");
//       setLoading(true);

//       try {
//         axios
//           .post(
//             `https://backend-emprende.herokuapp.com/api/v1/superadmin/create`,
//             { ...form },
//             { headers: { accept: "application/json", authorization: token } }
//           )
//           .then((respose) => {

//            alert(
//             {
//               title: "Registro Exitoso",
//               text: "Usuario registrado correctamente",
//               icon: "success",
//               button: false,
//               timer: 2000,
          
//             }
//            )
         
//             setData(respose.data);
//             setLoading(false);
//             setResponse(true);
//             setTimeout(() => {
//               setResponse(false);
//             }, 2500);
//           })
//           .catch((err) => {
//             if (err.response.data.errors.email) {
//               alert({
//                 title: "Error al registar usuario",
//                 text: "El correo electrónico ya esta registrado en el sistema",
//                 icon: "error",
//                 button: false,
//                 timer: 2500
//               })
//             }
     
        
//             setLoading(false);
//             setResponse(false);
//           });
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//         setResponse(false);
//       }
//     } else {
      
//       console.log("sadadasdas", errors.response);
//       console.log("Hay errores");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({
//       ...form,
//       [name]: value,
//     });
//   };

//   const reset = () => {
//     setForm(initialState);
//     setErrors({});
//   };



//   return (
//     <>
//       <h1>Formulario de Registro</h1>

//       <Form onSubmit={handleSubmit}>
//         <FormGroup>
//           <Label for="first_name">Nombre</Label>
//           <Input
//           estado = {nombre}
//           cambiarEstado = {setNombre}
//             autoComplete="false"
//             type="text"
//             name="first_name"
//             id="first_name"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={form.first_name}
//             required
//           />
//           {errors.first_name && (
//             <span className={span}>{errors.first_name}</span>
//           )}
//         </FormGroup>
//         <FormGroup>
//           <Label for="last_name">Apellido</Label>
//           <Input
//             autoComplete="false"
//             type="text"
//             name="last_name"
//             id="last_name"
//             onBlur={handleBlur}
//             onChange={handleChange}
//             value={form.last_name}
//           />
//           {errors.last_name && (
//             <span className={span}>{errors.last_name}</span>
//           )}
//         </FormGroup>
//         <FormGroup>
//           <Label for="email">Email</Label>
//           <Input
//             autoComplete="false"
//             type="email"
//             name="email"
//             id="email"
//             onBlur={handleBlur}
//             onChange={handleChange}
//             required
//             value={form.email}
//           />
//           {errors.email && <span className="errors">{errors.email}</span>}
//         </FormGroup>
//         <FormGroup>
//           <Label for="password">Password</Label>
//           <Input
//             autoComplete="false"
//             type="password"
//             name="password"
//             id="password"
//             onBlur={handleBlur}
//             onChange={handleChange}
//             required
//             value={form.password}
//           />
//           {errors.password && <span className="errors">{errors.password}</span>}
//         </FormGroup>

//         <FormGroup>
//           <Label for="personal_phone">Personal Phone</Label>
//           <Input
//             autoComplete="false"
//             type="text"
//             name="personal_phone"
//             id="personal_phone"
//             onBlur={handleBlur}
//             onChange={handleChange}
//             required
//             value={form.personal_phone}
//           />
//           {errors.personal_phone && (
//             <span className="errors">{errors.personal_phone}</span>
//           )}
//         </FormGroup>
//         <FormGroup>
//           <Label for="linkedin">Linkedin</Label>
//           <Input
//             autoComplete="false"
//             type="text"
//             name="linkedin"
//             id="linkedin"
//             onBlur={handleBlur}
//             onChange={handleChange}
//             required
//             value={form.linkedin}
//           />
//         </FormGroup>

     

//         <Button color="info" type="submit"> Crear</Button>
//         <Button color="danger" onClick={reset}  > Limpiar</Button>
//       </Form>
//       <br />
//     </>
//   );
// };

// export default EditFormNew;






import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";





const EditForm = (props) => {

  const [admin, setAdmin] = useState([]);
  const token = localStorage.getItem('token');
  const [error, setError] = useState(false);
  const navigate = useNavigate();




  const [form, setForm] = useState(
    {


      first_name: "",
      last_name:  "",
      email:  "",
      parsonal_phone:  "",
      linkedin :  "",
      state: "1"

    }
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }


  const FormEdit = async (e) => {
    e.preventDefault();

   
    try {

      if (props.item?.id) {
        await axios.post(
          `https://backend-emprende.herokuapp.com/api/v1/superadmin/${props.item.id}/update`,
          { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
        );



      } else {
        await axios.post(
          `https://backend-emprende.herokuapp.com/api/v1/superadmin/create`,
          { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
        );
      }


    } catch (error) {
      console.log(error);
    }
    props.toggle();
   
  }


  




  return (
    <Form onSubmit={FormEdit} className = "form">



      <FormGroup>
        <Label for="first_name">First Name</Label>
        <Input
          required
          type="text"
          name="first_name"
          id="first_name"
          onChange={handleChange}
          value={form.first_name === null ? "" : form.first_name}
        />
      </FormGroup>
      <FormGroup>
        <Label for="last_name">Last Name</Label>
        <Input
          type="text"
          name="last_name"
          id="last_name"
          onChange={handleChange}
          value={form.last_name === null ? "" : form.last_name}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={form.email === null ? "" : form.email}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={form.password === null ? "" : form.password}
        />
      </FormGroup>

      <FormGroup>
        <Label for="personal_phone">Personal Phone</Label>
        <Input
          type="text"
          name="personal_phone"
          id="personal_phone"
          onChange={handleChange}
          value={form.personal_phone === null ? "" : form.personal_phone}
        />
      </FormGroup>
      <FormGroup>
        <Label for="linkedin">Linkedin</Label>
        <Input

          type="text"
          name="linkedin"
          id="linkedin"
          onChange={handleChange}
          value={form.linkedin === null ? "" : form.linkedin}
        />
      </FormGroup>
      

      



      <Button color="info" >Submit</Button>

    </Form>
  );

}

export default EditForm;
