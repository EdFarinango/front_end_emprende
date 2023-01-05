

import React, { useState } from 'react';
import axios from 'axios';
import { Label, Button } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ContrastRounded } from '@mui/icons-material';

export const ConfirmPassword = () => {
    const navigate = useNavigate();
    const [token, settoken] = useState('')
    const [activo, setactivo] = useState(false)
    const [Mensajeactivo, setMensajeactivo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setpassword_confirmation] = useState('')

    useEffect(() => {
        let cadena = window.location.href;
        let token = cadena.split("/?token=");
        settoken(token[1]);

     }, []);

    const confirmPassword = async (token) => {
        token.preventDefault();
        try {
            const response = await axios.post(
                `https://backend-emprende.herokuapp.com/api/v1/reset-password`,
                { token, email, password, password_confirmation },
                { headers: { 'accept': 'application/json' } }
            )
            const { message } = response.data.data
            console.warn(message);
            setMensajeactivo(message);
            setactivo(true);
            navigate('/');
        } catch (error) {
            console.log(error.response.data.message, 'error');
            setEmail('');
            setPassword('');
            setpassword_confirmation('');
        }
    }


    

    return (
        <>
            <div className="flex justify-center py-12  ">
        <div className="block p-3 rounded-lg shadow-xl shadow-cyan-500/50 max-w-sm bg-white py-11 ">
          <div className="flex min-h-full items-center justify-center pt-5 pb-5 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <img
                  className="mx-auto h-20 w-min"
                  src="https://cdn-icons-png.flaticon.com/512/5868/5868371.png"
                  alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Ingresa tu nueva contraseña
                </h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={confirmPassword}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    {/* <label htmlFor="password" className="sr-only">
                      Correo
                    </label> */}
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
                      placeholder="Nueva Contraseña"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    {/* <label htmlFor="password" className="sr-only">
                      Correo
                    </label> */}
                    <input
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      value={password_confirmation}
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
                      placeholder="Confirma tu nueva Contraseña"
                      onChange={e => setpassword_confirmation(e.target.value)}
                    />
                  </div>
                </div>
                {/* este primer div es posible eliminar */}
               
                  <div>
                    <button
                      type="submit"
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    >
                      <span className="absolute inset-y-0 left-0 flex items-center  pl-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                          />
                        </svg>
                      </span>
                      Enviar
                    </button>
                  </div>
                  <b className='block ml-1 mt-1  font-semibold text-sm text-center text-violet-700 tracking-wide'>{Mensajeactivo}</b>         
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
    );
};



