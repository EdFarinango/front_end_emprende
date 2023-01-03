import Card from 'react-bootstrap/Card';

import ListGroup from 'react-bootstrap/ListGroup';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { useContext } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';


import { Row, Button } from 'react-bootstrap';

import  {AuthContext}  from  '../../contexts/auth/AuthContext';

import ModalForm from './ModalSu'




const AdminCard = () => {

  const [admins, setAdmin] = useState([]); 
  const getAdmin = async () => {
    try {
      const response = await axios.get(
        `https://backend-tesis.herokuapp.com/api/superadmin`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log("sss", response)
      setAdmin(response.data.data.users)
    } catch (error) {
      console.log(error);
    }
  }

  
 
  const { user} = useContext(AuthContext);
  const navigate = useNavigate();

  
  const token = localStorage.getItem('token');


  

  


  
  


   const deleteSuAdmin = async (id) => {
    try {
      const response = await axios.get(
        `https://backend-tesis.herokuapp.com/api/superadmin/${id}/destroy`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log("sss", response)
      getAdmin();
    } catch (error) {
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

    <Row className='mt-2  '>
        {admins.map((admin) => (            
          <Card style={{ width: '18rem' }} >
          <Card.Img  variant="top" src = 'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png' />
          
          <ModalForm buttonLabel="Editar" item={admin} updateState={updateState} admins={admins} /> 
  
          <Card.Body>
           
    
            <Card.Title className="text-center" value= 'key'>
              <h1 className="text-2xl font-bold " >{admin.full_name}</h1>
            </Card.Title>
            <Card.Text>
              <p className="text-center">{admin.email}</p>
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item className="text-center">{admin.rol}</ListGroup.Item>
            <ListGroup.Item className="text-center">{admin.state === 1 ? 'Activo' : 'Inactivo'

          

            
            }</ListGroup.Item>
            
            <ListGroup.Item className="text-center" >Linkedin</ListGroup.Item>
          </ListGroup>
          <Card.Body className="text-center">
         
            {admin.id !== user.id && (
                
                <Button
              variant="primary"
              className="text-center"
              onClick={() => deleteSuAdmin(admin.id)}
                > { admin.state === 1 ? 'Desactivar' : 'Activar'}</Button>
              )}
              {
                   
                 admin.id === user.id && (
                  // <Button
                  //   variant="primary"
                  //   className="text-center"
                  //   onClick={() => navigate('/users/admin/perfil')}
                  //  >Editar</Button>

                    <ModalForm buttonLabel="Perfil"   />
                
                )

              
                

              }
              

             





             
            
                         
          </Card.Body>
        </Card>
            
        ))}
    </Row>
  );
};


export default AdminCard;