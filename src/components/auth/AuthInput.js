import React from "react";

const AuthInput = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
  className = "",
  ...rest
}) => (
  <div className={`form-group ${className}`}>
    {label && <label className="form-label">{label}</label>}
    <input
      type={type}
      className={`form-control${error ? " is-invalid" : ""}`}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      {...rest}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default AuthInput;