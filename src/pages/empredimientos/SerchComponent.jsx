import React, { useState, useEffect } from 'react';
import axios from 'axios'

import ModalEmp from '../../components/organisms/ModalEmp';
import './style.css';
import ModalViewEmp from '../../components/organisms/ModalView';

const SearchComponent = () => {

    const [data, setData] = useState([])
    const token = localStorage.getItem('token')

    const [search, setSearch] = useState("")


    const searcher = (e) => {
        setSearch(e.target.value)
    }


    const getData = async () => {

        try {
            const response = await axios.get(
                `https://backend-emprende.herokuapp.com/api/v1/emprendimiento`,
                { headers: { accept: 'application/json', 'authorization': token } }
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
                { headers: { accept: 'application/json', 'authorization': token } }

            );
            //console.log(response.data)



        } catch (error) {
            console.log(error);
        }
    }

    const dato = !search ? data : data.filter((dato) => dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()))


    useEffect(() => {
        getData();
    }, []);

    //renderizamos la vista
    return (
        <div>

            <input value={search} onChange={searcher} type="text" placeholder='Search' className='form-control' />
            <table className="table table-striped table-bordered zero-configuration">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {dato.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>{item.descripcion}</td>
                            <td><img src={item.image} alt="" width="100px" /></td>
                            <td >  {item.estado === 1 ? (

                                <button className='btndesactivar' onClick={() => deleteEmprendimiento(item.id)} title="Desactivar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                                    <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                                </svg></button>

                            ) : (
                                <button className="btnactivar" onClick={() => deleteEmprendimiento(item.id)} title="Activar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                                    <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                                </svg></button>
                            )}

                                <ModalEmp emprendimientos={item} data={data} />
                                <ModalViewEmp emprendimientos={item} data={data} />

                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}
export default SearchComponent