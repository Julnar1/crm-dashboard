import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput";
import AuthPasswordInput from "../components/auth/AuthPasswordInput";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { useAuthForm } from "../hooks/useAuthForm";
import { authValidationRules } from "../utils/validation";
import { loginUser, selectLoginStatus } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialForm = {
    email: "",
    password: ""
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
    authValidationRules.login,
    loginUser,
    "Login successful!",
    "login",
    () => setTimeout(() => navigate('/'), 1200)//1.2s delay to ensure the user sees the success message before redirecting
  );

  // Handle navigation after successful login
  const loginStatus = useSelector(selectLoginStatus);
  useEffect(() => {
    if (loginStatus === 'succeeded') {
      navigate('/');
    }
  }, [loginStatus, navigate]);

  return (
    <AuthLayout
      title="Log in"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkPath="/register"
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
          placeholder="test@example.com" // Show hardcoded credential
          className="mb-3"
          required
        />
        
        <div className="form-group password-group d-flex justify-content-between align-items-center">
          <label className="mb-0">Password</label>
          <Link to="/forgot-password" className="forgot-link">
            Forgot password?
          </Link>
        </div>
        <AuthPasswordInput
          name="password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          placeholder="password123" // Show hardcoded credential
          iconRight="1.8em"
          iconTop="0.4em"
          required
        />
        
        <AuthButton type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default Login;
