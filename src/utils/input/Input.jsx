import React from 'react';

const Input = ({
  className,
  type,
  name,
  id,
  htmlFor,
  label,
  defaultChecked,
  disabled,
}) => {
  return (
    <>
      <input
        className={className}
        type={type}
        name={name}
        id={id}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
      <label htmlFor={htmlFor}>{label} </label>
    </>
  );
};

export default Input;
