import React from 'react';

const Input = ({
  className,
  type,
  name,
  id,
  htmlFor,
  label,
  defaultChecked,
}) => {
  return (
    <>
      <input
        className={className}
        type={type}
        name={name}
        id={id}
        defaultChecked={defaultChecked}
      />
      <label htmlFor={htmlFor}>{label} </label>
    </>
  );
};

export default Input;
