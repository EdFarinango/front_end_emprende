import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";

import { useNavigate } from "react-router-dom";

import EditForm from "../templates/FormNewEmp";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Row from "react-bootstrap/Row";

import { Alert } from "reactstrap";

import axios from "axios";
import { useEffect } from "react";

import InputLabel from "@mui/material/InputLabel";
import { Form, Label, Input } from "reactstrap";

import { NativeSelect } from "@mui/material";

import alert from "sweetalert";
const ModalNewEmp = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState(false);

  const [form, setFormData] = useState({
    rol_esfot: "",
    nombre: "",
    descripcion: "",
    categoria: "",
    direccion: "",
    cobertura: "",
    pagina_web: "",
    telefono: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    descuento: "",
    image: "",
    state : "0",
    segundo_estado: "0",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      console.log("No hay errores");
      const formData = new FormData();
      formData.append("rol_esfot", form.rol_esfot);
      formData.append("nombre", form.nombre);
      formData.append("descripcion", form.descripcion);
      formData.append("categoria", form.categoria);
      formData.append("direccion", form.direccion);
      formData.append("cobertura", form.cobertura);
      formData.append("pagina_web", form.pagina_web);
      formData.append("telefono", form.telefono);
      formData.append("whatsapp", form.whatsapp);
      formData.append("facebook", form.facebook);
      formData.append("instagram", form.instagram);
      formData.append("descuento", form.descuento);
      formData.append("image", image);
        formData.append("segundo_estado", form.segundo_estado);
        formData.append("state", form.state);

      await axios
        .post(
          `https://backend-emprende.herokuapp.com/api/v1/emprendimiento/create`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log("sss", form);
          console.log("sss", data);
          const res = response;

          //console.log("hey",response.data.data.emprendimiento);
          alert({
            title: "Emprende",
            text: "El emprendimiento se ha creado correctamente",
            icon: "success",
            button: false,
          });
        })
        .catch((error) => {
          console.log("uno",form);
          console.log("dod",error);
          console.log("ftr",error.response.status);
          if (error.response.status === 422) {
            alert({
              title: "Emprende",
              text: "No se puede enviar un formulario vacio.",
              icon: "error",
              button: false,
            });
          }
        });
        
    
    }else {
      alert({
        title: "Emprende",
        text: "Por favor, rellene todos los campos",
        icon: "error",
        button: false,
      });
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/emprendimiento`,
        { headers: { accept: "application/json", authorization: token } }
      );

      setData(response.data.data.emprendimientos);
      //console.log("hey",response.data.data)
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validationsForm(form));
  };

  const validationsForm = (form) => {
    let errors = {};

    let regexNombre = /^[a-zA-ZÀ-ÿ\s]{3,255}$/; // Letras y espacios, pueden llevar acentos.
    let regexTelefono = /^\d{10,10}$/; // 7 a 14 numeros.
    //let regexWeb =  /^[a-zA-ZÀ-ÿ\s]{1,28}$/; 
    let regexDescuento = /^[0-9]{1,2}$/;
    let regexRol = /^[a-zA-ZÀ-ÿ\s]{1,18}$/;
    //let regexCobertura = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    let regexDescripcion =/^[a-zA-Z\s,-áéíóúÁÉÍÓÚñÑ]{3,128}$/u; // Letras y espacios, pueden llevar acentos.
    let regexDireccion = /^[a-zA-Z\s,-áéíóúÁÉÍÓÚñÑ]{3,128}$/u; // Letras y espacios, pueden llevar acentos.
    let regexCategoria = /^[a-zA-ZÀ-ÿ\s]{3,40}$/; // Letras y espacios, pueden llevar acentos.
    // Letras y espacios, pueden llevar acentos.
    let regexWhatsapp = /^\d{7,14}$/; // 7 a 14 numeros.
    //let regexFacebook = /^(https?:\/\/)?([\da-z.-]+)\.([a-zA-ZÀ-ÿ\s.]{2,6})([/\w .-]*)*\/?$/;

    //let regexInstagram = /^[a-zA-ZÀ-ÿ\s]{1,28}$/; ///^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    let regexFoto = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;

    if (!form.rol_esfot) {
      errors.rol_esfot = "Obligatorio";
      console.log("rol obligatorio");
    } else if (!regexRol.test(form.rol_esfot)) {
      errors.rol_esfot = "El rol ingresado no es valido";
    } else
    if (!form.categoria) {
      errors.categoria = "Obligatoria";
    } else if (!regexCategoria.test(form.categoria)) {
      errors.categoria = "La categoria ingresado no es valida";
    }else









    

    

    //categoria
    
    //web

    if (!form.pagina_web) {
      errors.pagina_web = "Obligatoria";
    } 
    
    else

    // facebook
    if (!form.facebook) {
      errors.facebook = "Obligatorio";
      
    
    }else

    //Nombre
    if (!form.nombre) {
      errors.nombre = "Obligatorio";
     
    } else if (!regexNombre.test(form.nombre)) {
      errors.nombre = "El nombre ingresado no es valido";
    }else

    // Dirección

    if (!form.direccion) {
      errors.direccion = "Obligatoria";
    } else if (!regexDireccion.test(form.direccion)) {
      errors.direccion = "La direccion ingresado no es valida";
    }else
    //telefono

    if (!form.telefono) {
      errors.telefono = "Obligatorio";
    } else if (!regexTelefono.test(form.telefono)) {
      errors.telefono = "El telefono ingresado no es valido";
    }else

    //instagram
    if (!form.instagram) {
      errors.instagram = "Obligatorio";
    } else
    //descripcion

    if (!form.descripcion) {
      errors.descripcion = "Obligatoria";
    } else if (!regexDescripcion.test(form.descripcion)) {
      errors.descripcion = "La descripcion ingresado no es valida";
    }else

    //Cobertura

    if (!form.cobertura) {
      errors.cobertura = "Obligatoria";
    } else 

    //Whatsapp

    if (!form.whatsapp) {
      errors.whatsapp = "Obligatorio";
    } else if (!regexWhatsapp.test(form.whatsapp)) {
      errors.whatsapp = "El whatsapp ingresado no es valido";
    } else if (form.whatsapp.length > 10) {
      errors.whatsapp = "El whatsapp no puede tener mas de 10 caracteres";
    } else if (form.whatsapp.length < 10) {
      errors.whatsapp = "El whatsapp no puede tener menos de 10 caracteres";
    }else

    //descuento

    if (!form.descuento) {
      errors.descuento = "Obligatorio";
    } else if (!regexDescuento.test(form.descuento)) {
      errors.descuento = "Solo se aceptan números";
    }else

    //imagen

    if (!image) {
      errors.image = "Obligatoria";
    } else if (!regexFoto.test(image.name)) {
      console.log(image);
      errors.image = "La imagen ingresado no es valida";
    }

    return errors;
  
  };


 


    

        return (
            <div>
<Button className="btn-peticion" onClick={toggle}>Fomulario de petición de ingreso</Button>


<Modal isOpen={modal} toggle={toggle} size="lg">
    <ModalHeader toggle={toggle}>Petición Emprendimiento</ModalHeader>
    <ModalBody className="show-grid">
          <Container>
            <Form
              onSubmit={handleSubmit}
              component="form"
              noValidate
              className="formControl"
            >
              <Row>
                <Col xs={6} md={4}>
                  <FormGroup>
                    <InputLabel id="rol_esfot" className="form-label">
                      Rol Esfot
                    </InputLabel>

                    <NativeSelect
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{
                        name: "rol_esfot",
                        id: "rol_esfot",
                      }}
                    >
                      {" "}
                      <option value={""}></option>
                      <option value={"Estudiante"}>Estudiante</option>
                      <option value={"Egresado"}>Egresado</option>
                      <option value={"Docente"}>Docente</option>
                      <option value={"Administrativo"}>Administrativo</option>
                      <option value={"Otro"}>Otro</option>
                    </NativeSelect>
                  </FormGroup>
                  <p className="error">{errors.rol_esfot}</p>
                </Col>

                <Col xs={6} md={4}>
                  <FormGroup>
                    <Label for="nombre">Nombre</Label>
                    <Input
                      type="text"
                      name="nombre"
                      id="nombre"
                      placeholder="Nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <p className="error">{errors.nombre}</p>
                </Col>

                <Col xs={6} md={4}>
                  <FormGroup>
                    <Label for="descripcion">Descripcion</Label>
                    <Input
                      type="text"
                      name="descripcion"
                      id="descripcion"
                      placeholder="Descripcion"
                      value={form.descripcion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <p className="error">{errors.descripcion}</p>
                </Col>
                <Col xs={6} md={4}>
                  <FormGroup>
                    <InputLabel id="categoria">Categoria</InputLabel>
                    <NativeSelect
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{
                        name: "categoria",
                        id: "categoria",
                      }}
                    >
                      <option value={""}></option>
                      <option value={"Tecnologia"}>Tecnologia</option>
                      <option value={"Educacion"}>Educacion</option>
                      <option value={"Salud"}>Salud</option>
                      <option value={"Agroindustria"}>Agroindustria</option>
                      <option value={"Turismo"}>Turismo</option>
                      <option value={"Otro"}>Otro</option>
                    </NativeSelect>
                  </FormGroup>
                  <p className="error">{errors.categoria}</p>
                </Col>

                <Col xs={6} md={4}>
                  <FormGroup>
                    <Label for="direccion">Direccion</Label>
                    <Input
                      type="text"
                      name="direccion"
                      id="direccion"
                      placeholder="Direccion"
                      value={form.direccion === null ? "" : form.direccion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <p className="error">{errors.direccion}</p>
                </Col>
                <Col xs={6} md={4}>
                  <FormGroup>
                    <InputLabel id="cobertura">Cobertura </InputLabel>
                    <NativeSelect
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{
                        name: "cobertura",
                        id: "cobertura",
                      }}
                    >
                      <option value={""}></option>
                      <option value={"Quito Centro"}>Quito Centro</option>
                      <option value={"Quito Norte"}>Quito Norte</option>
                      <option value={"Cumbaya - Tumbaco"}>
                        Cumbaya - Tumbaco
                      </option>
                      <option value={"Valle de los Chillos"}>
                        Valle de los Chillos
                      </option>
                      <option value={"Otro"}>Otro</option>
                    </NativeSelect>
                  </FormGroup>
                  <p className="error">{errors.cobertura}</p>
                </Col>

                <Col xs={6} md={4}>
                  <FormGroup>
                    <Label for="pagina_web">Pagina Web</Label>
                    <Input
                      type="text"
                      name="pagina_web"
                      id="pagina_web"
                      placeholder="Pagina Web"
                      value={form.pagina_web === null ? "" : form.pagina_web}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <p className="error">{errors.pagina_web}</p>
                </Col>
                <Col xs={6} md={4}>
                  <FormGroup>
                    <Label for="telefono">Telefono</Label>
                    <Input
                      type="text"
                      name="telefono"
                      id="telefono"
                      placeholder="Telefono"
                      value={form.telefono === null ? "" : form.telefono}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <p className="error">{errors.telefono}</p>
                </Col>
                <Col xs={6} md={4}>
                  <FormGroup>
                    <Label for="whatsapp">Whatsapp</Label>
                    <Input
                      type="text"
                      name="whatsapp"
                      id="whatsapp"
                      placeholder="Whatsapp"
                      value={form.whatsapp === null ? "" : form.whatsapp}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <p className="error">{errors.whatsapp}</p>
                </Col>
                <Col xs={6} md={4}>
                  <FormGroup>
                    <Label for="facebook">Facebook</Label>
                    <Input
                      type="text"
                      name="facebook"
                      id="facebook"
                      placeholder="Facebook"
                      value={form.facebook === null ? "" : form.facebook}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <p className="error">{errors.facebook}</p>
                </Col>
                <Col xs={6} md={4}>
                  <FormGroup>
                    <Label for="instagram">Instagram</Label>
                    <Input
                      type="text"
                      name="instagram"
                      id="instagram"
                      placeholder="Instagram"
                      value={form.instagram === null ? "" : form.instagram}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <p className="error">{errors.instagram}</p>
                </Col>
                <Col xs={6} md={4}>
                  <FormGroup>
                    <Label for="descuento">Descuento</Label>
                    <Input
                      type="text"
                      name="descuento"
                      id="descuento"
                      placeholder="Descuento"
                      value={form.descuento === null ? "" : form.descuento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <p className="error">{errors.descuento}</p>
                  <Label for="descuento">Imagen promocional</Label>
                  <FormGroup>
                    <Input
                      type="file"
                      name="image"
                      id="image"
                      placeholder="Imagen"
                      onBlur={handleBlur}
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </FormGroup>
                  <p className="error">{errors.image}</p>
                </Col>
              </Row>

              <Button color="primary" onClick={handleSubmit}>
                Guardar
              </Button>
            </Form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalNewEmp;
