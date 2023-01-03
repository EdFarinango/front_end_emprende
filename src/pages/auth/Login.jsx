import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label, Button } from '../../components'
import { AuthContext } from '../../contexts';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaNetworkWired } from 'react-icons/fa';
import axiosClient from '../../services/axios-client';

export const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosClient.post('login', {
                email,
                password
            });

            const { access_token, token_type, user } = response.data.data
            console.warn(access_token, token_type, user);

            login(user, `${token_type} ${access_token}`);

            {user.rol === 'superadmin' ? navigate('/administracion') : navigate('/administracion')
}
        } catch (error) {
            if (!FaNetworkWired) {
                console.log('sdaasdads', error);
            } else {
                console.log(error.response.data.message, error);
                setEmail('');
                setPassword('');
            }
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
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                        <input

                            className='rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:border-cyan-500 disabled:opacity-50 block mt-2 w-full'
                            id='remember'
                            name='remember'
                            type='checkbox'
                        />
                        <label className='ml-2 text-sm text-gray-500' htmlFor='remember'>
                            Recuérdame
                        </label>
                    </div>
                    <div className='text-sm text-gray-500'>
                        <p>Olvidaste tu contraseña? <Link to='/recovery'><span>Recuperarla</span></Link></p>
                    </div>
                </div>

                <div className='pt-4 flex justify-center'>
                    <Button name='Iniciar sesión' styles='w-3/5' />
                </div>

            </form>



        </>
    );
}
