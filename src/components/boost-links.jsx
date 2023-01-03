import React from 'react';
import '../scss/boost-links.scss';
import GetStarted from '../utils/get-started';
const BoostLinks = () => {
    return (
        <div className="container-fluid p-0">
            <div className="boost-links">
                <p className="title">Boost your links today</p>
                <GetStarted />
            </div>
        </div>
    );
}

export default BoostLinks;