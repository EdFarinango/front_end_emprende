import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";





const EditFormEmp = ({emprendimientos}) => {

  const [form, setForm] = useState({
    id: emprendimientos.id ?? "",
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
    estado: emprendimientos.estado ?? "",
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
    if (Object.values(form).includes("")) {
      console.log("error");
      return;
    }
    try {
      if (emprendimientos.id) {
        await axios.post(
          `https://backend-tesis.herokuapp.com/api/emprendimiento/${emprendimientos.id}/update`,
          {
            ...form,
          },
          { headers: { accept: "application/json", authorization: token } }
        );
        toggle();
      } else {
        await axios.post(
          `https://backend-tesis.herokuapp.com/api/emprendimiento/create`,
          {
            ...form,
          },
          { headers: { accept: "application json", authorization: token } }
        );
        toggle();
      }
    } catch (error) {
      console.log(error);
    }
  };





  useEffect(() => {
  
    setForm({
      id: emprendimientos.id ?? "",
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
      estado: emprendimientos.estado ?? "",
    });
  }
  , [emprendimientos]);

  return (
    <Form onSubmit={handleSubmit}>

<FormGroup>
        <Label for="nombre">Id</Label>
       
        <Input
          type="text"
          name="id"
          id="id"
          placeholder="Id"
    
          value={form.id === null ? "" : form.id }
          onChange={handleChange}
          

        />
      </FormGroup>
        <FormGroup>
        <Label for="nombre">Rol</Label>
        <Input
          type="text"
          name="rol_esfot"
         
          placeholder="Rol"
          value={form.rol_esfot === null ? "" : form.rol_esfot}
          onChange={handleChange}

        />
      </FormGroup>
        <FormGroup>
        <Label for="nombre">Nombre</Label>
        <Input
          type="text"
          name="nombre"
          id="nombre"
          placeholder="Nombre"
          value={form.nombre === null ? "" : form.nombre}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="descripcion">Descripcion</Label>
        <Input

          type="text"
          name="descripcion"
          id="descripcion"
          placeholder="Descripcion"
          value={form.descripcion=== null ? "" : form.descripcion}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="categoria">Categoria</Label>
        <Input
          type="text"
          name="categoria"
          id="categoria"
          placeholder="Categoria"
          value={form.categoria=== null ? "" : form.categoria}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="direccion">Direccion</Label>
        <Input
          type="text"
          name="direccion"
          id="direccion"
          placeholder="Direccion"
          value={form.direccion=== null ? "" : form.direccion}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="cobertura">Cobertura</Label>
        <Input
          type="text"
          name="cobertura"
          id="cobertura"
          placeholder="Cobertura"
          value={form.cobertura === null ? "" : form.cobertura}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="pagina_web">Pagina Web</Label>
        <Input
          type="text"
          name="pagina_web"
          id="pagina_web"
          placeholder="Pagina Web"
          value={form.pagina_web=== null ? "" : form.pagina_web}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="telefono">Telefono</Label>
        <Input
          type="text"
          name="telefono"
          id="telefono"
          placeholder="Telefono"
          value={form.telefono=== null ? "" : form.telefono}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="whatsapp">Whatsapp</Label>
        <Input
          type="text"
          name="whatsapp"
          id="whatsapp"
          placeholder="Whatsapp"
          value={form.whatsapp=== null ? "" : form.whatsapp}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="facebook">Facebook</Label>
        <Input

          type="text"
          name="facebook"
          id="facebook"
          placeholder="Facebook"
          value={form.facebook=== null ? "" : form.facebook}
          onChange={handleChange}
        />
      </FormGroup>
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

    
      <Button type="submit" color="primary">
        Guardar
      </Button>

      



    </Form>
  );

    
}

export default EditFormEmp;
