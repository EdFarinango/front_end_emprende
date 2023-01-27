import React, { useState } from 'react';



import { Modal, ModalHeader, ModalBody, Button, Label } from "reactstrap";

import Container from 'react-bootstrap/Container';
import axios from 'axios';

import './styles.css';

const ModalPswd = () => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [activo, setActivo] = useState(false)
    const [email, setEmail] = useState('')
    const [activo2, setActivo2] = useState(false)

    
    const alert = () => {
        if (activo) {
            return (
                <div className="alert alert-success" role="alert">
                    Se ha enviado a tu correo
                </div>
            )
        }

        if (activo2) {
            return (
                <div className="alert alert-danger" role="alert">
                    Correo Invalido
                </div>
            )
        }
    }




    const ressetP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://backend-emprende.herokuapp.com/api/v1/forgot-password',
                { email },
                { headers: { 'accept': 'application/json' } }
            )
            console.log("Se ha enviado a tu correo");

            
           
            setEmail('');

            setActivo(true);
            setActivo2(false);

            setTimeout(() => {
                setModal(false);
            }
                , 3000);

          

               

               
            
           
      
        } catch (error) {
            console.log(error.response.data.message);
           
            setEmail('');   
            setActivo2(true);
            setActivo(false);

            alert.fire({
                icon: 'success',
                title: <h2>Mesaje enviado con EXITO!!</h2>,
                html: <p>Respondere lo mas pronto posible</p>,
                timer: 7000,
              })

        }
    }

   
    
    return (
        <>
          <div>
            <div className='li'>
     <p onClick={toggle}>Recuperar Contraseña </p>

     </div>



<Modal isOpen={modal} toggle={toggle} size="sm">
<ModalHeader toggle={toggle}>EmPreNde</ModalHeader>
    <ModalBody className="show-grid">
        
        <Container>

          <h2 className='text-2xl md:text-3xl font-bold'>¿Olvidaste tu contraseña?</h2>
            <p className='text-sm text-gray-500 pb-6'>Por favor ingrese su dirección de correo electrónico</p>
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
                    <Button name='Enviar' styles='w-3/5' toggle = {toggle} >
                        Enviar
                    </Button>

                </div>
                
            </form> 

        </Container>
    </ModalBody>
  {activo && <div  className='alert alert-success' role='alert'>
                    Se ha enviado un correo a tu cuenta
                   
                    {
                        setTimeout(() => {
                            setActivo(false);
                        }
                        , 3000)
                    }



                    </div>}
                    {activo2 && <div className='alert alert-danger' role='alert'
                    
                    
                    >
                    No se ha podido enviar el correo, intente de nuevo
               
                    {setTimeout(() => {
                        setActivo2(false);

                    }, 3000)

                    
                    }
                    </div>
                    
                    }

    </Modal>
    </div>
        </>
    );
}

export default ModalPswd;
