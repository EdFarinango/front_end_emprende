


import React, { useContext } from 'react';
import { AuthContext } from '../../contexts';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import ModalEmp from '../../components/organisms/ModalEmp';
import ModalNewEmp from '../../components/organisms/ModalNewEmp';
import { Link } from 'react-router-dom';



export const Emprendimientos = ({emprendimientos}) => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);



  const getData = async () => {
    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/emprendimiento`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );

      setData(response.data.data.emprendimientos)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteEmprendimiento = async (id) => {
    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/emprendimiento/${id}/destroy`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );

      getData();
    } catch (error) {
      console.log(error);
    }
  }

  


  const updateState = (item) => {
    const newData = data.map((emprendimientos) => {
      if (emprendimientos.id === item.id) {
        return item;
      }
      return emprendimientos;
    });
    setData(newData);


  }








  useEffect(() => {
    getData();
  }, []);

  return (


    <>
      <ModalNewEmp buttonLabel="Crear" updateState={updateState} />
      <Table responsive hover>


        <thead>
          <tr>
            <th>Id</th>
            <th>Rol</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Categoria</th>
            <th>Direccion</th>
            <th>Cobertura</th>
            <th>Web</th>
            <th>Telefono</th>
            <th>Whatsapp</th>
            <th>Facebook</th>
            <th>Instagram</th>

            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>


          {data?.map((emprendimientos) => (
            <tr key={emprendimientos}>
              <td>{emprendimientos.id}</td>
              <td>{emprendimientos.rol_esfot}</td>
              <td>{emprendimientos.nombre}</td>
              <td>{emprendimientos.descripcion}</td>
              <td>{emprendimientos.categoria}</td>
              <td>{emprendimientos.direccion}</td>
              <td>{emprendimientos.cobertura}</td>
              <td>{emprendimientos.pagina_web}</td>

              <td>{emprendimientos.telefono}</td>
              <td>{emprendimientos.whatsapp}</td>
              <td>{emprendimientos.facebook}</td>
              <td>{emprendimientos.instagram}</td>



              <td>
                {emprendimientos.estado === 1 ? (
                  <button className="btn btn-danger" onClick={() => deleteEmprendimiento(emprendimientos.id)}>Desactivar</button>
                ) : (
                  <button className="btn btn-success" onClick={() => deleteEmprendimiento(emprendimientos.id)}>Activar</button>
                )}

                <ModalEmp emprendimientos={emprendimientos} updateState={updateState} data={data} />






















              </td>








            </tr>
          ))}





        </tbody>
      </Table>





    </>







  );
}
export default Emprendimientos;