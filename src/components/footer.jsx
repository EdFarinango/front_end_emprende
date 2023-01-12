import React from 'react';
import '../scss/footer.scss';

const Footer = () => {
    return (
        <div className="container-fluid">
            <div className="footer ">
                <p className="main-title">Emprende</p>

               
                <div className="title-wrap">
                    <p className="title">Recursos</p>
                    <p className="sub-title">Blog</p>
                    
                </div>
                <div className="title-wrap">
                    <p className="title">Comisión</p>
                    <p className="sub-title">About</p>
                   
                    <p className="sub-title">Contact</p>
                </div>

            </div>
        </div>
    );
}

export default Footer;