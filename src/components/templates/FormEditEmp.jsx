import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, ModalHeader, ModalBody, Modal } from "reactstrap";
import axios from "axios";







const EditFormEmp = ({ emprendimientos }) => {

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




  const token = localStorage.getItem("token");
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,


    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (emprendimientos.id) {
        await axios.post(
          `https://backend-emprende.herokuapp.com/api/v1/emprendimiento/${emprendimientos.id}/update`,
          {
            ...form,
          },
          { headers: { accept: "application/json", authorization: token } }
        );
      } else {
        await axios.post(
          "https://backend-emprende.herokuapp.com/api/v1/emprendimiento/create",
          {
            ...form,
          },
          { headers: { accept: "application/json", authorization: token } }
        );
      }

    } catch (error) {
      //console.log(error);
    }
  };


  const handleUpload = (e) => {
    e.preventDefault();







    const formData = new FormData();
    formData.append('image', image);



    axios.post(`https://backend-emprende.herokuapp.com/api/v1/emprendimiento/${emprendimientos.id}/logo`, formData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    }

    ).then(response => {
      //console.log(response);
    })
      .catch(error => {
        //console.log(error);
      });
  }








  return (
    <>




      <Button color="primary" onClick={toggle}>

        Actualizar Imagen
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Actualizar Imagen</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="exampleFile">File</Label>
              <Input
                type="file"
                name="file"
                id="exampleFile"
                onChange={(e) => setImage(e.target.files[0])}
              />

            </FormGroup>
            <Button type="submit" color="primary" onClick={handleUpload}>
              Guardar
            </Button>
          </Form>
        </ModalBody>
      </Modal>



    </>



  );


}

export default EditFormEmp;
