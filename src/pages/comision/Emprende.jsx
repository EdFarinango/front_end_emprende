import * as React from 'react';

import Back from './back.png'

import { Link } from 'react-router-dom';
import "./style.css";
import Logo from './Logo.png';
import Contact from "./Contact";
import contacts from "./contacts";












export default function Comision() {
  function addContact(contact) {
    return (
      <Contact
        name={contact.name}
        img={contact.imgUrl}
        descripcion={contact.descripcion}
        email={contact.email}
      />
    );
  }
  

  
  

  return (

    <div className="home-page hm-pg">
      <div className="hm-pg__wrapper">
        <header className="hm-pg__header">
          <div className="hm-pg__header-wrapper">
            <nav className="hm-pg__navbar home-nav flex">
              
            
            </nav>
            <section className="home-hero grid">
              <div className="home-hero__content">
                
                <h1 className="home-hero__title">
                  Que es EmPreNde
                </h1>
                <p>
                EmPreNde-ESFOT es una comisión, 
                formada en el periodo 2019B, de la Escuela de Formación de Tecnólogos de la EPN. 
                Tiene como objetivo promover la mentalidad emprendedora dentro de la comunidad de la ESFOT.
                </p>
               
              </div>
              <div className="home-hero__img-container">
                <img src ={Logo} alt="" />
              </div>
            </section>
            
          </div>
        </header>
        <main className="hm-pg__main home-main-pg">
          <div className="home-main-pg__wrapper">
            <h1 className="home-main-pg__title">
              Su IDENTIDAD
            </h1>
            <p className="home-main-pg__description">
            EmPreNde se forma tras la iniciativa de los profesores, de transformar el enfoque del estudiante politécnico hacia uno proactivo, motivado a 
            contribuir con la sociedad mediante la creación de emprendimientos que generen impacto.El trabajo que se realiza siempre está enmarcado en apertura y colaboración.
            </p>
          </div>
          
        </main>
       
          <div className="home-main-pg__wrapper">
            
            <p className="home-main-pg__description">
            <section className="contacts">
            <h1 className="home-main-pg__title">
              Miembros de la comisión 
            </h1>
           
      {contacts.map(addContact)}
    </section>
            </p>
          </div>
          
      
        
        <footer className="footer">
          <div className="footer__wrapper">
          <p className="footer__brand">
           “No hay fracasos, solo reveses. Y los reveses pueden 
ser parte del camino.”.
Iván Vallejo
            </p>
            </div>
         


                        
                              </footer>
      
      </div>
    </div>

    
          );
}