import React from 'react';

const Input = ({ label, className = '', ...props }) => {
  const id = React.useId();
  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <input id={id} className="input-field" {...props} />
    </div>
  );
};

export default Input;
