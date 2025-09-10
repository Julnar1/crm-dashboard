import React from "react";
import { useLocation, Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";

const ForgotPasswordConfirmation = () => {
  const location = useLocation();
  const email = location.state?.email || "your email";

  return (
    <AuthLayout
      title="Check Your Email"
      footerText="Back to"
      footerLinkText="Login"
      footerLinkPath="/login"
      footerClass="mt-3"
    >
      <div className="text-center">
        <div className="mb-4">
          <i className="fas fa-envelope-open-text" style={{ fontSize: '3rem', color: '#28a745' }}></i>
        </div>
        
        <h4 className="mb-3">Password Reset Email Sent</h4>
        
        <p className="text-muted mb-4">
          We've sent a password reset link to <strong>{email}</strong>
        </p>
        
        <div className="alert alert-info" role="alert">
          <h6>What happens next?</h6>
          <ul className="text-start mb-0">
            <li>Check your email inbox (and spam folder)</li>
            <li>Click the password reset link in the email</li>
            <li>Create a new password</li>
            <li>Sign in with your new password</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <p className="text-muted small">
            Didn't receive the email? 
            <Link to="/forgot-password" className="ms-1">Try again</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordConfirmation; 