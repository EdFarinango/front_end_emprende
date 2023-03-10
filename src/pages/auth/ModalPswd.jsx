import React, { useState } from 'react';



import { Modal, ModalHeader, ModalBody, Button, Label } from "reactstrap";

import Container from 'react-bootstrap/Container';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import './styles.css';
import alert from "sweetalert2";
import X from "../../components/assets/logo_esfot_buho.png"
const Alerta = withReactContent(alert)


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
            // loading mienstras se procesa la peticion 





            setEmail('');

            setActivo(true);
            setActivo2(false);

            Alerta.fire({
                icon: 'success',
                title: <h2>Mesaje enviado con EXITO!!</h2>,
                html: <p>Revise su bandeja de entrada</p>,

            }).then((result) => {
                if (result.isConfirmed) {
                    setActivo(false);
                    setTimeout(() => {
                        setModal(false);
                    }
                        , 200);

                }
            })








            //.data.errors.email 

        } catch (error) {
            // console.log("sdsd",error.response.data.message);

            setEmail('');
            setActivo2(true);
            setActivo(false);
            if (error.response.data.message === 'El campo correo electr??nico es obligatorio.') {
                Alerta.fire({

                    title: <h2>Atenci??n!</h2>,
                    html: <div><p>El campo correo electr??nico es obligatorio.</p>
                        <p>Por favor ingrese su correo electr??nico</p>
                    </div>,
                    timer: 5000,
                })
            }

            if (error.response.data.errors.email === 'No encontramos ning??n usuario con ese correo electr??nico.') {
                Alerta.fire({
                    title: <p>Atenci??n!</p>,
                    text: "No encontramos ning??n usuario asociado con ese correo electr??nico.",
                    //imagen con tama??o 100x100
                    imageUrl: X,
                    imageHeight: 100,
                    imageWidth: "auto",
                    imageAlt: 'alertaEPN',
                    //boton desactivado
                    showConfirmButton: false,
                    //tiempo de desaparicion
                    timer: 3000,
                    //color de fondo
                    background: '#fff',
                    //color de texto
                    customClass: {
                        title: 'text-dark',
                        text: 'text-dark',
                        popup: 'bg-light',
                        icon: 'bg-light'
                    }


                })
            } else if (error.response.data.errors.email === 'Por favor espere antes de intentar de nuevo.') {
                Alerta.fire({
                    title: <p>Atenci??n!</p>,
                    text: "Tiene una solicitud pendiente, por favor espere de 2 a 5  minutos antes de intentar de nuevo",
                    //imagen con tama??o 100x100
                    imageUrl: X,
                    imageHeight: 100,
                    imageWidth: "auto",
                    imageAlt: 'alertaEPN',
                    //boton desactivado
                    showConfirmButton: false,
                    //tiempo de desaparicion
                    timer: 3000,
                    //color de fondo
                    background: '#fff',
                    //color de texto
                    customClass: {
                        title: 'text-dark',
                        text: 'text-dark',
                        popup: 'bg-light',
                        icon: 'bg-light'
                    }


                })
            }


        }
    }



    return (
        <>
            <div>
                <Button color="link" className='linkPswd' onClick={toggle}>??Olvidaste tu contrase??a?</Button>
                



                <Modal isOpen={modal} toggle={toggle} size="sx">
                    <ModalHeader toggle={toggle}>EmPreNde</ModalHeader>
                    <ModalBody className="show-grid">

                        <Container>

                            <h2 className='text-2xl md:text-3xl font-bold'>??Olvidaste tu contrase??a?</h2>
                            <p className='text-sm text-gray-500 pb-6'>Por favor ingrese su direcci??n de correo electr??nico</p>
                            <form className='space-y-7 text-left' onSubmit={ressetP}>
                                <div>
                                    <Label description="Correo" htmlFor='email' />
                                    <input
                                        className='rounded-2xl text-base px-4 py-2 border-gray-300 focus:border-cyan-500 disabled:opacity-50 mt-2'
                                        id='email'
                                        name='email'
                                        type='email'
                                        value={email}
                                        placeholder='Ingresa tu correo'
                                        maxLength="35"
                                        pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'

                                        autoFocus
                                        onChange={e => setEmail(e.target.value)}
                                    />


                                </div>
                                <div className='pt-4 flex justify-center'>
                                    <Button name='Enviar' styles='w-3/5' toggle={toggle} >
                                        Enviar
                                    </Button>

                                </div>

                            </form>

                        </Container>
                    </ModalBody>





                </Modal>
            </div>
        </>
    );
}

export default ModalPswd;
