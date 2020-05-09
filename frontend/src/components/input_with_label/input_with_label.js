import React from 'react';
import PropTypes from 'prop-types';

import './styles.css'

const InputWithLabel = ({
  label,
  error,
  onChange,
  value,
}) => {
  return (
    <div className="input-with-label-container">
      <p className="label">{label}</p>
      <input className="input" type="text" value={value} onChange={onChange} />
    </div>
  )
};

InputWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default InputWithLabel;
