import React from 'react';

const Input = ({ className, type, name, id, htmlFor, label }) => {
  return (
    <>
      <input className={className} type={type} name={name} id={id} />
      <label htmlFor={htmlFor}>{label} </label>
    </>
  );
};

export default Input;
