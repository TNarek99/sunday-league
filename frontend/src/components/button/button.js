import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'

const Button = ({ label, onClick, ...rest }) => {
  return (
    <button className="styled-button" onClick={onClick} {...rest}>
      {label}
    </button>
  )
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
