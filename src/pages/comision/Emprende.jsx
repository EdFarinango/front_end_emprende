import * as React from 'react';


import "./style.css";
import Logo from './Logo.png';
import Contact from "./Contact";

import contacts from "./contacts";
import FacebookIcon from '@mui/icons-material/Facebook';
import Footer from '../../components/footer';















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





    <><div className="w3-row w3-padding-64 about" id="about">
      <div className="w3-content">
        <div className="w3-col m6 w3-padding-large w3-hide-small">
          <img src={Logo} className="w3-round w3-image" alt="logo" width={600} height={750} style={{ marginTop: 75 }} />
        </div>
        <div className="w3-col m6 w3-padding-large">
          <h1 className="w3-center"> Que es EmPreNde </h1><br />
          <h5 className="w3-center">Tradition since 1889</h5>
          <p className="w3-large">EmPreNde-ESFOT es una comisión,
            formada en el periodo 2019B, de la Escuela de Formación de Tecnólogos de la EPN.
            Tiene como objetivo promover la mentalidad emprendedora dentro de la comunidad de la ESFOT.</p>
        </div>
      </div>
    </div>
    <div className="w3-row w3-padding-64 identidad" id="idnetidad">
      <div className="w3-content">
        
     
          <h1 className="w3-center">    Su IDENTIDAD </h1><br />
          <h5 className="w3-center">ESFOT</h5>
          <p className="w3-large">
          EmPreNde se forma tras la iniciativa de los profesores, 
            de transformar el enfoque del estudiante politécnico hacia uno proactivo, motivado a 
            contribuir con la sociedad mediante la creación de emprendimientos que generen impacto. 
            El trabajo que se realiza siempre está enmarcado en apertura y colaboración.

          </p>
        </div>


    
    
      </div>



      <div className="w3-row w3-padding-64 miembros w3-padding-top-24" id="miembros">
      

          <h1 className="w3-center">    Sus MIEMBROS </h1><br />
          <h5 className="w3-center">ESFOT</h5>
          <div className="w3-content w3-padding-top-24">
          {contacts.map(addContact)}
          
           
     
        </div>

        
    
    
      </div>
      <footer className="w3-container w3-theme-d3 w3-padding-16">
  <Footer />
  </footer>

    


      
      
      
      
      
      
      
      
      </>




















  );
}