import React from 'react';
import '../scss/navbar.scss';

const Navbar = () => {
    return (
        <div className="container-fluid">

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand">Shortly</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="container">
                        <ul className="navbar-nav left-items">
                            <li className="nav-item">
                                <span className="nav-link">Features</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link">Pricing</span>
                            </li>

                            <li className="nav-item">
                                <span className="nav-link">Resources</span>
                                <div className="divider"></div>
                            </li>







                        </ul>
                    </div>
                    <div className="container">

                        <ul className="navbar-nav ml-auto right-items">
                            <li className="nav-item">
                                <span className="nav-link">Login</span>
                            </li>
                            <li className="nav-item">

                                <button className="btn sign-up-btn" type="submit">Sign Up</button>
                            </li>
                        </ul>
                    </div>


                </div>
            </nav>
        </div>
    );
}

export default Navbar;