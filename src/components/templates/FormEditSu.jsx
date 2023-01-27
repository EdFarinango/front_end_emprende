import React, { useState, useEffect, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts";





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
      personal_phone: props.item?.personal_phone ?? "",
      linkedin : props.item?.linkedin ?? "",
      state: props.item?.state ?? "",
   
    


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

    if (Object.values(form).includes("")) {
      console.log(e);
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2500);
      return;
    }

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
    props.updateState();
  }


  const handleUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    axios.post(`https://backend-emprende.herokuapp.com/api/v1/profile/avatar`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    }

    ).then(response => {
        const res = response.data;
        console.log(res);
  

    })

        .catch(error => {
            console.log(error);
        });
}


















  // useEffect(() => {
  //   if (props.item) {
  //     const { id, first_name, last_name, email, personal_phone, linkedin } = props.item;
  //     setForm({ id, first_name, last_name, email, personal_phone, linkedin});
  //   }
  // }, [props.item]);




  return (
    <Form onSubmit={FormEdit} >

      <FormGroup>
        <Label for="first_name">First Name</Label>
        <Input
          autoComplete="false"
          type="text"
          name="first_name"
          id="first_name"
          onChange={handleChange}
          value={form.first_name}
        />
      </FormGroup>
      <FormGroup>
        <Label for="last_name">Last Name</Label>
        <Input
        autoComplete="false"
          type="text"
          name="last_name"
          id="last_name"
          onChange={handleChange}
          value={form.last_name}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
        autoComplete="false"
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={form.email}
        />
       

      </FormGroup>
      <FormGroup>
        <Label for="personal_phone">Personal Phone</Label>
        <Input
autoComplete="false"
          type="text"
          name="personal_phone"
          id="personal_phone"
          onChange={handleChange}
          value={form.personal_phone}
        />
      </FormGroup>

      <FormGroup>
        <Label for="linkedin">Linkedin</Label>
        <Input
autoComplete="false"
          type="text"
          name="linkedin"
          id="linkedin"
          onChange={handleChange}
          value={form.linkedin}
        />
      </FormGroup>
      { props.item.id === user.id &&



<FormGroup>
 

<Input
    type="file"
    name="image"
    id="image"
    placeholder="Imagen"

    onChange={(e) => setImage(e.target.files[0])}
/>
<Button color="primary" onClick={handleUpload}>Actualizar</Button>









</FormGroup>
  
  }
     

      
    



      <Button color="info" >Submit</Button>
      {error && <p className="text-danger">Todos los campos de datos son obligatorios</p>}

    </Form>
  );

}

export default EditForm;
