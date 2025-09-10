import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ 
  title, 
  children, 
  footerText, 
  footerLinkText, 
  footerLinkPath,
  containerClass = "login-container",
  bgClass = "login-bg",
  footerClass = ""
}) => {
  return (
    <div className={`${bgClass} flex-column justify-content-center align-items-center`}>
      <div className={containerClass}>
        <h2 className="login-title">{title}</h2>
        {children}
        {footerText && (
          <div className={`login-footer ${footerClass}`}>
            {footerText} <Link to={footerLinkPath}>{footerLinkText}</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout; 