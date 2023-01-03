import React from 'react';
import '../scss/footer.scss';

const Footer = () => {
    return (
        <div className="container-fluid p-0">
            <div className="footer ">
                <p className="main-title">Emprende</p>

                <div className="title-wrap">
                    <p className="title">Servicios</p>
                    <p className="sub-title">1</p>
                    <p className="sub-title">2</p>
                    <p className="sub-title">3</p>
                </div>
                <div className="title-wrap">
                    <p className="title">Recursos</p>
                    <p className="sub-title">Blog</p>
                    <p className="sub-title">Developers</p>
                    <p className="sub-title">Analytics</p>
                </div>
                <div className="title-wrap">
                    <p className="title">Comisión</p>
                    <p className="sub-title">About</p>
                    <p className="sub-title">Our Team</p>
                    <p className="sub-title">Careers</p>
                    <p className="sub-title">Contact</p>
                </div>

            </div>
        </div>
    );
}

export default Footer;