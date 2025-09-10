import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthInput from "../components/auth/AuthInput";
import AuthPasswordInput from "../components/auth/AuthPasswordInput";
import AuthSelect from "../components/auth/AuthSelect";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { useAuthForm } from "../hooks/useAuthForm";
import { authValidationRules } from "../utils/validation";
import { registerUser, selectRegisterStatus } from "../redux/slices/authSlice";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    country: "",
    password: "",
    confirmPassword: ""
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
    authValidationRules.register,
    registerUser,
    "Registration successful!"
  );

  // Handle navigation after successful registration
  const registerStatus = useSelector(selectRegisterStatus);
  useEffect(() => {
    if (registerStatus === 'succeeded') {
      navigate('/login');
    }
  }, [registerStatus, navigate]);

  return (
    <AuthLayout
      title="Register"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkPath="/login"
      containerClass="register-container"
      bgClass="register-bg"
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="register-row">
          <AuthInput
            label="First Name"
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.firstName}
            placeholder="Enter your first name"
            required
          />
          <AuthInput
            label="Last Name"
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.lastName}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="register-row">
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
          <AuthInput
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phone}
            placeholder="Enter your phone number"
            required={false}
          />
        </div>
        <div className="register-row">
          <div className="form-group position-relative">
            <label className="">Password</label>
            <AuthPasswordInput
              name="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              placeholder="Enter your password"
              iconRight="1.8em"
              iconTop="0.4em"
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
              placeholder="Confirm your password"
              iconRight="1.8em"
              iconTop="0.4em"
              required
            />
          </div>
        </div>
        <div className="register-row">
          <AuthInput
            label="Company Name"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.company}
            placeholder="Enter your company name"
            required={false}
          />
          <AuthSelect
            label="Industry Type"
            name="industry"
            value={form.industry}
            className="position-relative"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.industry}
            required
          >
            <option value="">Choose</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </AuthSelect>
        </div>
        <div className="register-row register-row--single">
          <AuthInput
            label="Country or Region"
            name="country"
            type="text"
            value={form.country}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.country}
            placeholder="Enter your country or region"
            required={false}
          />
          <div className="w-50 d-flex align-items-end">
            <AuthButton type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </AuthButton>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register; 