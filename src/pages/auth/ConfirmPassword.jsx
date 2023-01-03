

import React, { useState } from 'react';
import axios from 'axios';
import { Label, Button } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const ConfirmPassword = () => 
{  
    const navigate = useNavigate();
    const [token, settoken] = useState('')
    const [activo, setactivo] = useState(false)
    const [Mensajeactivo, setMensajeactivo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setpassword_confirmation] = useState('')

    
    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token");
        settoken(token);
    }, [])


    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/v1/reset-password',
                { email, password, password_confirmation, token },
                { headers: { 'accept': 'application/json' } }
            )
            const {message} = response.data.data
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
            <h2 className='text-2xl md:text-3xl font-bold'>Bienvenido </h2>
            <p className='text-sm text-gray-500 pb-6'>Ingresa a tu cuenta</p>
            <form className='space-y-7 text-left' onSubmit={onLogin}>
                <div>
                    <Label description="Dirección de correo" htmlFor='email' />
                    <input
                        className='rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:border-cyan-500 disabled:opacity-50 block mt-2 w-full'
                        id='email'
                        name='email'
                        type='email'
                        value={email}
                        placeholder='Ingresa tu correo'
                        maxLength="35"
                        required
                        autoFocus
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <Label description="Contraseña" htmlFor='password' />
                    <input
                        className='rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:border-cyan-500 disabled:opacity-50 block mt-2 w-full'
                        id='password'
                        name='password'
                        type='password'
                        value={password}
                        placeholder='Ingresa tu contraseña'
                        maxLength="35"
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <Label description="Confirmar contraseña" htmlFor='password_confirmation' />
                    <input
                        className='rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:border-cyan-500 disabled:opacity-50 block mt-2 w-full'
                        id='password_confirmation'
                        name='password_confirmation'
                        type='password'
                        value={password_confirmation}
                        placeholder='Ingresa tu contraseña'
                        maxLength="35"
                        required
                        onChange={e => setpassword_confirmation(e.target.value)}
                    />
                </div>
                <div>
                    <Button type='submit' text='Iniciar sesión' />
                </div>
            </form>
            <div className='text-center pt-6'>
                <p className='text-sm text-gray-500'>
                    ¿No tienes una cuenta?{' '}
                    <a

                        className='text-cyan-500 hover:text-cyan-700'
                        href='/register'
                    >
                        Regístrate
                    </a>
                </p>
            </div>
            <div className='text-center pt-6'>
                <p className='text-sm text-gray-500'>
                    ¿Olvidaste tu contraseña?{' '}
                    <a

                        className='text-cyan-500 hover:text-cyan-700'
                        href='/forgot-password'
                    >
                        Recuperar contraseña
                    </a>
                </p>
            </div>
            {activo ? (
                <div className='text-center pt-6'>
                    <p className='text-sm text-gray-500'>
                        {Mensajeactivo}
                    </p>
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
};



