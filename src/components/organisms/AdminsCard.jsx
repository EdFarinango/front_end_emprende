import Card from 'react-bootstrap/Card';

import ListGroup from 'react-bootstrap/ListGroup';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { useContext } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';


import { Row, Button } from 'react-bootstrap';

import { AuthContext } from '../../contexts/auth/AuthContext';
import ModalForm from './ModalAd';
import ModalForm2 from './ModalNewAd';




export const AdminsCard = () => {


  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [admins, setAdmin] = useState([]);

  const token = localStorage.getItem('token');


  const getAdmin = async () => {
    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/admin`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log("sss", response)
      setAdmin(response.data.data.users)
    } catch (error) {
      console.log("Aqui",error);
    }
  }



  const deleteAdmin = async (id) => {
    try {
      console.warn(id);
      //eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("Are you sure?")
      if (confirmation) {
        await axios.get(
          `https://backend-emprende.herokuapp.com/api/v1/admin/${id}/destroy`,
          { headers: { 'accept': 'application/json', 'authorization': token } }
        );

        await getAdmin();


      }

    }

    catch (error) {
      console.log(error);
    }


  }
  const updateState = (item) => {
    const itemIndex = admins.findIndex(data => data.id === item.id)
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...admins.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...admins.slice(itemIndex + 1)
    ]
    setAdmin(newArray)
  }


  useEffect(() => {
    getAdmin();

  }, [])




  return (

    <Row className='mt-3'>
      <ModalForm2 buttonLabel="Crear" updateState={updateState} admins={admins} />
      {admins.map((admin) => (
        <Card style={{ width: '18rem' }} >
          <Card.Img variant="top" src='https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png' />
          <Card.Body>

            <ModalForm buttonLabel="Editar" item={admin} updateState={updateState} admins={admins} />


            <Card.Title className="text-center" value='key'>
              <h1 className="text-2xl font-bold " >{admin.full_name}</h1>
            </Card.Title>
            <Card.Text>
              <p className="text-center">{admin.email}</p>
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item className="text-center">{admin.rol}</ListGroup.Item>
            <ListGroup.Item className="text-center">{
              admin.state === 1 ? 'Activo' : 'Inactivo'


            }</ListGroup.Item>

            <ListGroup.Item className="text-center" >Linkedin</ListGroup.Item>
          </ListGroup>
          <Card.Body className="text-center">
            <Button
              variant="primary"
              className="text-center"
              onClick={() => deleteAdmin(admin.id)}
            > {admin.state === 1 ? 'Desactivar' : 'Activar'}</Button>

          </Card.Body>
        </Card>





      ))}
    </Row>







  );

}


export default AdminsCard;