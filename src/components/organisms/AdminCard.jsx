

import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import {  Button } from 'react-bootstrap';

import { AuthContext } from '../../contexts/auth/AuthContext';

import ModalForm from './ModalSu'
import ModalForm2 from './ModalNewSu';

import './styles.css'
import alert from 'sweetalert'





const AdminCard = () => {

  const [admins, setAdmin] = useState([]);
 
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  const token = localStorage.getItem('token');

  const getAdmin = async () => {
    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/superadmin`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );

     ///revisar  updateState(response.data.data.users)


      setAdmin(response.data.data.users)


    } catch (error) {
      console.log(error);
    }
  }

























  const deleteSuAdmin = async (id, state) => {
  

    if (state === 1 ) {

    alert ({
      title: "Emprende, mensaje del servidor",
      text: "¿Está seguro que desea desactivar este usuario?",
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],

    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.get(
            `https://backend-emprende.herokuapp.com/api/v1/superadmin/${id}/destroy`,
            { headers: { 'accept': 'application/json', 'authorization': token } }
          ).then(response => {
            const message = response.data.message;
            console.log("sssss", message);
    
           if (response.data.message === 'Usuario desactivado correctamente'  ) {
            alert({
              title: "Emprende, mensaje del servidor",
              text: "El usuario ha sido desactivado correctamente",
              icon: "success",
              button: "Aceptar",
            });
          } else {
            alert({
              title: "Emprende, mensaje del servidor",
              text: "El usuario ha sido activado correctamente",
              icon: "info",
              button: "Aceptar",
            });
    
          }
    
          });
    
    
    
       
        } catch (error) {
          console.log(error);
        }
      } else {
        alert({
          title: "Emprende, mensaje del servidor",
          text: "El usuario no ha sido desactivado",
          icon: "info",
          button: "Aceptar",
        });
      }
    });
  } else {
    alert ({
      title: "Emprende, mensaje del servidor",
      text: "¿Está seguro que desea activar este usuario?",
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],

    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.get(
            `https://backend-emprende.herokuapp.com/api/v1/superadmin/${id}/destroy`,
            { headers: { 'accept': 'application/json', 'authorization': token } }
          ).then(response => {
            const message = response.data.message;
            console.log("sssss", message);
    
           if (response.data.message === 'Usuario desactivado correctamente'  ) {
            alert({
              title: "Emprende, mensaje del servidor",
              text: "El usuario ha sido desactivado correctamente",
              icon: "success",
              button: "Aceptar",
            });
          } else {
            alert({
              title: "Emprende, mensaje del servidor",
              text: "El usuario ha sido activado correctamente",
              icon: "info",
              button: "Aceptar",
            });
    
          }
    
          });
    
    
    
        
        } catch (error) {
          console.log(error);
        }
      } else {
        alert({
          title: "Emprende, mensaje del servidor",
          text: "El usuario no ha sido activado",
          icon: "info",
          button: false,
          timer: 2000,
        });
      }
    });

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
    getAdmin();
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
            <ModalForm2 buttonLabel="Crear" type = "button"/>

            <p>Un equipo respaldado por el conocimiento</p>
            <div className="line" />
          </div>
        </div>
      </div>
      <div className="row">
        {admins.map((admin) => (





          <div className="col-12 col-sm-6 col-lg-3" key={admin.id}>
            <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp' }}>
              {/* Team Thumb*/}
              <div className="advisor_thumb"><img src={admin.image} alt="" />
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
                {admin.id !== user.id && (

                  <Button
                    variant="primary"
                    className="text-center"
                    onClick={() => deleteSuAdmin(admin.id, admin.state)}
                  > {admin.state === 1 ? 'Desactivar' : 'Activar'}</Button>
                )}
                {

                  admin.id === user.id && (
                    // <Button
                    //   variant="primary"
                    //   className="text-center"
                    //   onClick={() => navigate('/users/admin/perfil')}
                    //  >Editar</Button>

                    //<ModalForm buttonLabel="Perfil" />
                    <Link to="/administracion" className="btn btn-primary">Panel de administracion </Link>

                  )




                }

                <ModalForm buttonLabel="Editar" item={admin}  admins={admins} updateState={updateState} />











              </div>
            </div>
          </div>




        ))}
      </div>






    </>
  );
};


export default AdminCard;