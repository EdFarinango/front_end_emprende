import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { TableCell } from '@mui/material'
import ModalEmp from '../../components/organisms/ModalEmp'

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
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );

            setData(response.data.data.emprendimientos)
            console.log(response.data.data.emprendimientos)
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
            console.log(id)



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
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {dato.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>{item.descripcion}</td>

                          
                            <TableCell align="right">  {item.estado === 1 ? (
                                <button className="btn btn-info" onClick={() => deleteEmprendimiento(item.id)}>Desactivar</button>
                            ) : (
                                <button className="btn btn-danger" onClick={() => deleteEmprendimiento(item.id)}>Activar</button>
                            )}

                                <ModalEmp emprendimientos={item} data={data} />
                            </TableCell>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}
export default SearchComponent