



import React, { useContext } from 'react';
import { AuthContext } from '../../contexts';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { useState } from 'react';

import { useEffect } from 'react';




export const CatalogoEmp = () => {

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

    

    useEffect(() => {
        getData();
      }, []);

return (
    <>
        <div className="container">
            <div className="row">   
                <div className="col-12">
                    <h1 className="text-center">Catalogo de Emprendimientos</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nombre</th>
                                                    <th scope="col">Descripcion</th>
                                                    <th scope="col">Categoria</th>
                                                    <th scope="col">Estado</th>
                                                    <th scope="col">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{item.nombre}</td>
                                                            <td>{item.descripcion}</td>
                                                            <td>{item.categoria}</td>
                                                            <td>{item.estado}</td>
                                                            <td>
                                                                <button className="btn btn-primary">Editar</button>
                                                                <button className="btn btn-danger">Eliminar</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    
    
        
        
        </>
)

}

export default CatalogoEmp;

