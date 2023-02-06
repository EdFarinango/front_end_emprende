import React from 'react';
import '../scss/main-section.scss';
import  Logo from'./assets/logo.svg';
import GetStarted from '../utils/get-started';

const Main = () => {
    return (

        
        <div className="container-fluid main-wrap aling center">
            <div className="main" >

                <div className="main-left">
                    <p className="main-header">Comisión Emprende </p>
                    <p className="under-title"> Buscamos impulsar la generación de emprendimientos en la comunidad ESFOT.  </p>
                    <GetStarted />
                </div>
                <div className="main-right ">
                <img className="working-illustration" src={Logo} alt="logo-emprende"  width="220" height="240"/>
                </div>
            </div>
       </div>
    );
}

export default Main;