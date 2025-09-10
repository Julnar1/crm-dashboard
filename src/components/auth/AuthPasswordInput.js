import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AuthPasswordInput = ({
  name,
  value,
  onChange,
  onBlur,
  error,
  showPassword,
  setShowPassword,
  placeholder,
  iconRight = "1.8em",
  iconTop = "2.1em",
  className = "",
  ...rest
}) => (
  <div className={`form-group position-relative ${className}`}>
    <input
      type={showPassword ? "text" : "password"}
      className={`form-control${error ? " is-invalid" : ""}`}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      {...rest}
      required
    />
    <span
      className="password-toggle-icon"
      onClick={() => setShowPassword((prev) => !prev)}
      style={{ position: "absolute", right: iconRight, top: iconTop, cursor: "pointer" }}
      tabIndex={0}
      role="button"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <FiEye /> : <FiEyeOff />}
    </span>
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default AuthPasswordInput;