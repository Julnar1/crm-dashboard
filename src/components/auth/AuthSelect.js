import React from "react";
import { FiChevronDown } from "react-icons/fi";

const AuthSelect = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  children,
  className = "",
  ...rest
}) => (
  <div className={`form-group ${className}`}>
    {label && <label className="form-label">{label}</label>}
    <select
      className={`form-control${error ? " is-invalid" : ""}`}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      {...rest}
    >
      {children}
    </select>
    <FiChevronDown className="dropdown-icon" />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default AuthSelect;