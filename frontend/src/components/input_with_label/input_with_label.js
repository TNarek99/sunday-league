import React from 'react';
import PropTypes from 'prop-types';

import './styles.css'

const InputWithLabel = ({
  label,
  error,
  showError,
  onChange,
  value,
  ...rest
}) => {
  return (
    <div className="input-with-label-container">
      <p className="label">{label}</p>
      <input className={`input ${showError && error && 'input-error'}`} type="text" value={value} onChange={onChange} {...rest} />
      {showError && error && <p className="error">{error}</p>}
    </div>
  )
};

InputWithLabel.defaultProps = {
  showError: false,
  error: '',
}

InputWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  showError: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

export default InputWithLabel;
