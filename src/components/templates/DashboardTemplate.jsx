
import axios from 'axios';
import React, { useContext } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import { Inicio } from '../../pages/landingPage/Inicio';


import axiosClient from '../../services/axios-client';



export const DashboardTemplate = () => {

    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const urlActual = location.pathname;
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    function Detectar(props) {

        if (props === 'admin') {
            return (

                <ul className="">
                </ul>

            );

        } else if (props === 'superadmin') {

            return (
                <ul className="">

                    <button type="button" onClick={onLogout} className="m-auto text-white text-2xl block mt-4 hover:text-red-300 text-center bg-red-900 p-1 rounded-lg">Logout</button>
                </ul>
            );

        }

    }
    const onLogout = async () => {
        try {
            await axios.post(
                'api/logout',
                {}, { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            navigate('/', { replace: true });
            logout();
            console.log('logout');
        } catch (error) {
            console.log(error);
        }

    };
    return (
        <div className='md:flex '>









            <div className='flex flex-col flex-1'>
                <div className='container mx-auto px-6 py-8'>
                    <h3 className='text-gray-700 text-3xl font-medium'>Dashboard</h3>
                    <div className='mt-4'>
                        <div className='flex flex-wrap -mx-6'>



                        </div>
                    </div>
                    <div className='mt-8'>

                        <div className='mt-4'>

                            <div className='mt-4'>
                                {user.role === 'superadmin' ? <Inicio /> : <Outlet />

                                }


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>






    );
}
