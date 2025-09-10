import React from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { useAuthForm } from "../hooks/useAuthForm";
import { authValidationRules } from "../utils/validation";
import { forgotPassword } from "../redux/slices/authSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const initialForm = {
    email: ""
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
    authValidationRules.forgotPassword,
    forgotPassword,
    "Password reset link sent to your email!",
    'forgotPassword',
    () => {
      navigate('/forgot-password-confirmation', { 
        state: { email: form.email } 
      });
    }
  );
  return (
    <AuthLayout
      title="Forgot Password"
      footerText="Back to"
      footerLinkText="Login"
      footerLinkPath="/login"
      footerClass="mt-3"
    >
      <form onSubmit={handleSubmit} noValidate>
        <AuthInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          placeholder="Enter your email"
          required
        />
        <AuthButton type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Reset Password"}
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
