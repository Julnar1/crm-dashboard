import React from "react";

const AuthButton = ({ children, className = "", ...rest }) => (
  <button className={`btn btn-primary w-100 mt-3 ${className}`} {...rest}>
    {children}
  </button>
);

export default AuthButton;