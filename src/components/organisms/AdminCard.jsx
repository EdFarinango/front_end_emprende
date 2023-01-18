import Card from 'react-bootstrap/Card';

import ListGroup from 'react-bootstrap/ListGroup';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


import { Row, Button } from 'react-bootstrap';

import { AuthContext } from '../../contexts/auth/AuthContext';

import ModalForm from './ModalSu'
import ModalForm2 from './ModalNewSu';

import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




const AdminCard = () => {

  const [admins, setAdmin] = useState([]);
  const getAdmin = async () => {
    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/superadmin`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log("sss", response)
      setAdmin(response.data.data.users)
    } catch (error) {
      console.log(error);
    }
  }



  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  const token = localStorage.getItem('token');











  const deleteSuAdmin = async (id) => {
    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/superadmin/${id}/destroy`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );

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

    //crear un nuevo usuario

    <>
    
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-lg-6">
            {/* Section Heading*/}
            <div className="section_heading text-center wow fadeInUp" data-wow-delay="0.2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp' }}>
              <h3>EnPreNde <span> Team</span></h3>
              <ModalForm2 buttonLabel="Crear" />

              <p>Un equipo respaldado por el conocimiento</p>
              <div className="line" />
            </div>
          </div>
        </div>
        <div className="row">
        {admins.map((admin) => (

          
          
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp' }}>
                {/* Team Thumb*/}
                <div className="advisor_thumb"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt />
                  {/* Social Info*/}
                  <div className="social-info">
                    <a href="#">
                    <i className="fa fa-edit" /></a>
                      <a href="#">
                        <i className="fa fa-twitter" />
                        </a><a href="#"><i className="fa fa-linkedin" /></a></div>
                </div>
                {/* Team Details*/}
                <div className="single_advisor_details_info">
                  <h6>{admin.full_name}</h6>
                  <p>{admin.email}</p>
                  <p className={"designation"}>{admin.rol}</p>
                  <p className={"designation"}>{admin.state === 1 ? 'Activo' : 'Inactivo'}</p>
                  <div className="line" />
                  {admin.state === 1 ? <button className="btn btn-danger" onClick={() => deleteSuAdmin(admin.id)}>Desactivar</button> : <button className="btn btn-success" onClick={() => deleteSuAdmin(admin.id)}>Activar</button>
                  }
                  










                </div>
              </div>
            </div>

         


        ))}
 </div>
  




      {/* <Row className='mt-2  '>
      <ModalForm2 buttonLabel="Crear" />
      {admins.map((admin) => (
        <Card style={{ width: '18rem' }} >
          <Card.Img variant="top" src='https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png' />

          <ModalForm buttonLabel="Editar" item={admin} updateState={updateState} admins={admins} />

          <Card.Body>


            <Card.Title className="text-center" value='key'>
              <h1 className="text-2xl font-bold " >{admin.full_name}</h1>
            </Card.Title>
            <Card.Text>
              <p className="text-center">{admin.email}</p>
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item className="text-center">{admin.rol}</ListGroup.Item>
            <ListGroup.Item className="text-center">{admin.state === 1 ? 'Activo' : 'Inactivo'




            }
           
            
            </ListGroup.Item>

            <ListGroup.Item className="text-center" >Linkedin</ListGroup.Item>
           
          </ListGroup>
          <Card.Body className="text-center">

            {admin.id !== user.id && (

              <Button
                variant="primary"
                className="text-center"
                onClick={() => deleteSuAdmin(admin.id)}
              > {admin.state === 1 ? 'Desactivar' : 'Activar'}</Button>
            )}
            {

              admin.id === user.id && (
                // <Button
                //   variant="primary"
                //   className="text-center"
                //   onClick={() => navigate('/users/admin/perfil')}
                //  >Editar</Button>

                <ModalForm buttonLabel="Perfil" />

              )




            }











          </Card.Body>
        </Card>

      ))}
    </Row> */}
    </>
  );
};


export default AdminCard;