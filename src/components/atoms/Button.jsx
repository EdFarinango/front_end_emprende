import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ name, type, styles }) => {
    return (
        <>
            <button
                className={`btn btn-secondary btn-lg
                ${styles}`}
                type={type}
            >
                {name}
            </button>
        </>
    );
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    styles: PropTypes.string,
}

Button.defaultProps = {
    type: 'submit',
}