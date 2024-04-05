import React from 'react';
import './InputControl.scss';

const InputControl = ({ errors, name, ...otherProps }) => {
  return (
    <div>
      <input
        className='input__inner'
        name={name}
        autoComplete='off'
        style={errors[name] ? { borderColor: 'red' } : {}}
        {...otherProps}
      />

      {errors[name] && <span style={{ color: 'red' }}>{errors[name]}</span>}
    </div>
  );
};

export default InputControl;
