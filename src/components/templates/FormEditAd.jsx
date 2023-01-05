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


      id: props.item?.id ?? "",
      first_name: props.item?.first_name ?? "",
      last_name: props.item?.last_name ?? "",
      email: props.item?.email ?? "",
      state: props.item?.state ?? ""

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
      console.log("error");
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2500);
      return;
    }

    try {

      if (props.item?.id) {
        await axios.post(
          `https://backend-emprende.herokuapp.com/api/v1/admin/${props.item.id}/update`,
          { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
        );



      } else {
        await axios.post(
          `https://backend-emprende.herokuapp.com/api/v1/admin/create`,
          { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
        );
      }


    } catch (error) {
      console.log(error);
    }
    props.toggle();
    props.updateState();
  }





















  useEffect(() => {
    if (props.item) {
      const { id, first_name, last_name, email } = props.item;
      setForm({ id, first_name, last_name, email });
    }
  }, [props.item]);




  return (
    <Form onSubmit={FormEdit} >

      <FormGroup>
        <Label for="first_name">First Name</Label>
        <Input
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



      <Button color="info" >Submit</Button>

    </Form>
  );

}

export default EditForm;
