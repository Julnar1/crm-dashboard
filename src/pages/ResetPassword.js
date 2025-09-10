// This page simulates a password reset via email link
// In real implementation:
// 1. User clicks email link with token parameter
// 2. Token is validated against database (not localStorage)
// 3. Token has expiration time
// 4. Token is single-use only
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AuthPasswordInput from "../components/auth/AuthPasswordInput";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { useAuthForm } from "../hooks/useAuthForm";
import { authValidationRules } from "../utils/validation";
import { resetPassword, selectResetPasswordStatus } from "../redux/slices/authSlice";

const ResetPassword = () => {
  const { token } = useParams(); // Token from URL (in real app, this comes from email link)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoadingToken, setIsLoadingToken] = useState(true);
  const navigate = useNavigate();

  const initialForm = {
    password: "",
    confirmPassword: ""
  };

  // Custom action creator that includes token
  const resetPasswordWithToken = (formData) => {
    return resetPassword({ 
      token, 
      password: formData.password, 
      confirmPassword: formData.confirmPassword 
    });
  };

  const {
    form,
    errors,
    isLoading,
    handleChange,
    handleBlur,
    handleSubmit
  } = useAuthForm(
    initialForm,
    authValidationRules.resetPassword,
    resetPasswordWithToken,
    "Password reset successful!",
    'resetPassword' //<--pass the status key explicitly.this is the key for the status in the redux store
  );

  // Handle navigation after successful reset
  const resetPasswordStatus = useSelector(selectResetPasswordStatus);
  useEffect(() => {
    if (resetPasswordStatus === 'succeeded') {
      navigate('/login');
    }
  }, [resetPasswordStatus, navigate]);

  // Validate token on component mount
  useEffect(() => {
    const validateToken = async () => {
      try {
        setIsLoadingToken(true);
        
        // Check if token exists in URL
        if (!token) {
          toast.error('No reset token provided in URL');
          navigate('/forgot-password');
          return;
        }

        // In real implementation, this would:
        // 1. Send token to backend API
        // 2. Backend validates token against database
        // 3. Check if token is expired
        // 4. Check if token has been used before
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock validation - in real app, this would be API response
        if (token && token.length > 10) {
          setIsTokenValid(true);
        } else {
          toast.error('Invalid or expired reset token. Please request a new password reset.');
          navigate('/forgot-password');
        }
      } catch (error) {
        console.error('Error validating token:', error);
        toast.error('Error validating reset token. Please try again.');
        navigate('/forgot-password');
      } finally {
        setIsLoadingToken(false);
      }
    };

    validateToken();
  }, [token, navigate]);

  // Show loading state while validating token
  if (isLoadingToken) {
    return null;
  }

  // Don't render form if token is invalid
  if (!isTokenValid) {
    return (
      <AuthLayout
        title="Invalid Token"
        footerText="Request New Reset Link"
        footerLinkText="Request New Reset Link"
        footerLinkPath="/forgot-password"
      >
        <p className="text-center mb-3">The reset token is invalid or has expired.</p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Password"
      footerText="Back to"
      footerLinkText="Login"
      footerLinkPath="/login"
      footerClass="mt-3"
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group position-relative">
          <label className="form-label">New Password</label>
          <AuthPasswordInput
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            placeholder="Enter new password"
            iconRight="1.8em"
            iconTop="0.4em"
            className="mb-3"
            required
          />
        </div>
        <div className="form-group position-relative">
          <label className="form-label">Confirm Password</label>
          <AuthPasswordInput
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword}
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
            placeholder="Confirm new password"
            iconRight="1.8em"
            iconTop="0.4em"
            className="mb-3"
            required
          />
        </div>
        <AuthButton type="submit" disabled={isLoading}>
          {isLoading ? "Resetting..." : "Reset Password"}
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword; 