import React, { useState } from 'react';
import axios from 'axios';
import { Label, Button } from '../../components'
import { Link } from 'react-router-dom';


export const Recovery = () => 
{    
    const [activo, setActivo] = useState(false)  
    const [email, setEmail] = useState('')  
    const [activo2,setActivo2] =useState(false)

    const ressetP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(                
                'http://127.0.0.1:8000/api/v1/forgot-password',
                { email},
                { headers: { 'accept': 'application/json' } }
            )              
            console.log("Se ha enviado a tu correo crack :D");  
             setActivo(true);
             setActivo2(false);
        } catch (error) {
            console.log(error.response.data.message, 'error');
            setEmail('');  
            setActivo2(true);
            setActivo(false);

        }
    }
    return (
        <>       
        <Link to="/login" className='block ml-3 mt-3 font-semibold text-2x1 text-cyan-400 tracking-wide'> Regresar </Link>  
       
            <h2 className='text-2xl md:text-3xl font-bold'>¿Olvidaste tu contraseña?😨</h2>
            <p className='text-sm text-gray-500 pb-6'>Por favor ingrese su cuenta de correo electronico</p>
            <form className='space-y-7 text-left' onSubmit={ressetP}>          
                <div>
                    <Label description="Correo" htmlFor='email' />
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
                <div className='pt-4 flex justify-center'>
                    <Button name='Enviar' styles='w-3/5' />
                    
                </div>                
                    <b className='block ml-100 mt-3  font-semibold text-xl text-center text-violet-700 tracking-wide'>{activo ? 'Mensaje enviado : Revisa tu correo' : ''}</b>
                    <b className='block ml-100 mt-2  font-semibold text-xl text-center text-violet-700 tracking-wide'>{activo2 ? 'Correo Invalido' : ''}</b>
            </form>
            
        </>
    );
}
