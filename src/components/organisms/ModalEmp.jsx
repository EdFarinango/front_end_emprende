import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

import axios from "axios";
import { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import { Form, FormGroup, Label, Input } from "reactstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { NativeSelect } from "@mui/material";
import "./styles.css";
import alert from "sweetalert";

const ModalEmp = ({ emprendimientos }) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const toggle = () => setModal(!modal);
  const [image, setImage] = useState([]);

  const [form, setForm] = useState({
    rol_esfot: emprendimientos.rol_esfot ?? "",
    nombre: emprendimientos.nombre ?? "",
    descripcion: emprendimientos.descripcion ?? "",
    categoria: emprendimientos.categoria ?? "",
    direccion: emprendimientos.direccion ?? "",
    cobertura: emprendimientos.cobertura ?? "",
    pagina_web: emprendimientos.pagina_web ?? "",
    telefono: emprendimientos.telefono ?? "",
    whatsapp: emprendimientos.whatsapp ?? "",
    facebook: emprendimientos.facebook ?? "",
    instagram: emprendimientos.instagram ?? "",
    descuento: emprendimientos.descuento ?? "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `https://backend-emprende.herokuapp.com/api/v1/emprendimiento/${emprendimientos.id}/update`,
        {
          ...form,
        },
        { headers: { accept: "application/json", authorization: token } }
      );
      alert("Emprendimiento actualizado correctamente").then(() => {
        window.location.reload();

        toggle();
      });
    } catch (error) {
      //console.log(error);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    axios
      .post(
        `https://backend-emprende.herokuapp.com/api/v1/emprendimiento/${emprendimientos.id}/logo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setModal(!modal);

        alert({
          title: "Emprende",
          text: "La imagen se actualizó correctamente",
          icon: "success",
          button: false,
          timer: 3000,
        });
        window.location.reload();
      })

      .catch((error) => {
        //console.log(error);
        if (
          error.response.data.message ===
          "El campo image no debe ser mayor que 512 kilobytes."
        ) {
          alert({
            title: "Emprende",
            text: "Peso máximo del archivo 512kb, por favor seleccione una imagen mas liviana",
            icon: "error",
            button: false,
          });
        } else if (error.response.statusText === "Unprocessable Content") {
          alert({
            title: "Emprende",
            text: "Debe elejir una imagen para enviarla.",
            icon: "error",
            button: false,
          });
          //fotos
        }
      });
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/emprendimiento`,
        { headers: { accept: "application/json", authorization: token } }
      );

      setData(response.data.data.emprendimientos);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <button className="btneditEmp" onClick={toggle} title= "Editar Emprendimiento ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fillRule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          />
        </svg>
      </button>

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Editar Emprendimiento</ModalHeader>
        <ModalBody className="show-grid">
          <Container>
            <Form onSubmit={onSubmit}>
              <Row>
                <Col xs={6} md={4}>
                  <FormGroup>
                    <InputLabel id="rol_esfot">Rol Esfot</InputLabel>

                    <NativeSelect
                      onChange={handleChange}
                      defaultValue={form.rol_esfot}
                      inputProps={{
                        name: "rol_esfot",
                        id: "rol_esfot",
                      }}
                    >
                      {" "}
                      <option value={""}></option>
                      <option value={"Egresado"}>Egresado</option>
                      <option value={"Docente"}>Docente</option>
                      <option value={"Administrativo"}>Administrativo</option>
                      <option value={"Estudiante"}>Estudiante</option>
                      <option value={"Otro"}>Otro</option>
                    </NativeSelect>
                  </FormGroup>
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
                    />
                  </FormGroup>
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
                    />
                  </FormGroup>
                </Col>
                <Col xs={6} md={4}>
                  <FormGroup>
                    <InputLabel id="categoria">Categoria</InputLabel>
                    <NativeSelect
                      defaultValue={form.categoria}
                      onChange={handleChange}
                      inputProps={{
                        id: "categoria",
                        name: "categoria",
                      }}
                    >
                      <option value={""}></option>
                      <option value={"Alimentación"}>Alimentación</option>
                      <option value={"Educacion"}>Educacion</option>
                      <option value={"Tecnología"}>Tecnología</option>
                      <option value={"Textil"}>Textil</option>
                      <option value={"Hogar y Limpieza"}>
                        Hogar y Limpieza
                      </option>
                      <option value={"Otro"}>Otros</option>
                    </NativeSelect>
                  </FormGroup>
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
                    />
                  </FormGroup>
                </Col>
                <Col xs={6} md={4}>
                  <FormGroup>
                    <InputLabel id="cobertura">Cobertura </InputLabel>
                    <NativeSelect
                      onChange={handleChange}
                      value={form.cobertura}
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
                      <option value={"Otros"}>Otros</option>
                    </NativeSelect>
                  </FormGroup>
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
                    />
                  </FormGroup>
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
                    />
                  </FormGroup>
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
                    />
                  </FormGroup>
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
                    />
                  </FormGroup>
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
                    />
                  </FormGroup>
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
                    />
                  </FormGroup>
                </Col>
              </Row>

              {/* enviar datso actualizados al otro componente  */}

              <Button color="primary" onClick={onSubmit} className="subir">
                Guardar
              </Button>

              <Row>
                <hr
                  style={{
                    color: "black",
                    backgroundColor: "black",
                    height: 1,
                    marginTop: "12px",
                  }}
                />
                <Label for="descuento">
                  Solamente si es necesario actualizar la imagen
                </Label>
                <Col xs={12} md={8}>
                  <FormGroup>
                    <Input
                      type="file"
                      name="image"
                      id="image"
                      placeholder="Imagen"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <Button
                      color="primary"
                      onClick={handleUpload}
                      className="mt-3 subir"
                    >
                      Actualizar Imagen
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
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

export default ModalEmp;
