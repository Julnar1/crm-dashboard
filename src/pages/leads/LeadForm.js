import React, { useState, useEffect } from "react";
import PhoneInput from "../../components/PhoneInput";
import "../../styles/main.scss"; // ✅ importing main.scss

const LeadForm = ({ onCancel, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    jobTitle: "",
    contactOwner: "",
    leadStatus: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        email: initialData.email || "",
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        phone: initialData.phone || "",
        jobTitle: initialData.jobTitle || "",
        contactOwner: initialData.contactOwner || "",
        leadStatus: initialData.status || "",
      });
    } else {
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        jobTitle: "",
        contactOwner: "",
        leadStatus: "",
      });
    }
  }, [initialData]);

  const validate = (fieldName = null) => {
    const newErrors = {};
    
    // Email validation
    if (!fieldName || fieldName === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = "Email address is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address (e.g., john@example.com)";
      } else if (formData.email.length > 254) {
        newErrors.email = "Email address is too long (maximum 254 characters)";
      }
    }

    // First name validation
    if (!fieldName || fieldName === 'firstName') {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      } else if (formData.firstName.trim().length < 2) {
        newErrors.firstName = "First name must be at least 2 characters long";
      } else if (formData.firstName.trim().length > 50) {
        newErrors.firstName = "First name cannot exceed 50 characters";
      } else if (!/^[a-zA-Z\s'-]+$/.test(formData.firstName.trim())) {
        newErrors.firstName = "First name can only contain letters, spaces, hyphens, and apostrophes";
      }
    }

    // Last name validation
    if (!fieldName || fieldName === 'lastName') {
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      } else if (formData.lastName.trim().length < 2) {
        newErrors.lastName = "Last name must be at least 2 characters long";
      } else if (formData.lastName.trim().length > 50) {
        newErrors.lastName = "Last name cannot exceed 50 characters";
      } else if (!/^[a-zA-Z\s'-]+$/.test(formData.lastName.trim())) {
        newErrors.lastName = "Last name can only contain letters, spaces, hyphens, and apostrophes";
      }
    }

    // Phone validation
    if (!fieldName || fieldName === 'phone') {
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (formData.phone.replace(/\D/g, '').length < 10) {
        newErrors.phone = "Please enter a valid phone number (minimum 10 digits)";
      } else if (formData.phone.replace(/\D/g, '').length > 15) {
        newErrors.phone = "Phone number is too long (maximum 15 digits)";
      }
    }

    // Job title validation (optional but with constraints)
    if (!fieldName || fieldName === 'jobTitle') {
      if (formData.jobTitle.trim() && formData.jobTitle.trim().length > 100) {
        newErrors.jobTitle = "Job title cannot exceed 100 characters";
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field and validate in real-time if field was touched
    if (touched[name]) {
      const fieldErrors = validate(name);
      setErrors((prev) => ({ 
        ...prev, 
        [name]: fieldErrors[name] 
      }));
    }
  };

  const handlePhoneChange = (phone) => {
    setFormData((prev) => ({
      ...prev,
      phone,
    }));
    
    // Clear error for phone field and validate in real-time if field was touched
    if (touched.phone) {
      const fieldErrors = validate('phone');
      setErrors((prev) => ({ 
        ...prev, 
        phone: fieldErrors.phone 
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    const fieldErrors = validate(name);
    setErrors((prev) => ({ 
      ...prev, 
      [name]: fieldErrors[name] 
    }));
  };

  const handlePhoneBlur = () => {
    setTouched((prev) => ({ ...prev, phone: true }));
    
    // Validate phone field on blur
    const fieldErrors = validate('phone');
    setErrors((prev) => ({ 
      ...prev, 
      phone: fieldErrors.phone 
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      jobTitle: true,
    };
    setTouched(allTouched);
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus on first error field
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.focus();
      }
      return;
    }
    
    // Clean data before submission
    const cleanedData = {
      ...formData,
      email: formData.email.trim().toLowerCase(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phone: formData.phone.trim(),
      jobTitle: formData.jobTitle.trim(),
    };
    
    // Submit the form
    onSubmit(cleanedData);

    // Only clear the form if creating (not editing)
    if (!initialData) {
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        jobTitle: "",
        contactOwner: "",
        leadStatus: "",
      });
      setErrors({});
      setTouched({});
    }
  };

  return (
    <>
      <div className="overlay" onClick={onCancel}></div>
      <div className="create-lead-panel">
        <button type="button" className="close-button" onClick={onCancel}>×</button>
        <h6>{initialData ? "Edit Lead" : "Create Lead"}</h6>
        <form onSubmit={handleSave} className="lead-form" noValidate>
          <label>Email<span className="required">*</span></label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter email address"
            className={errors.email ? 'error' : ''}
            autoComplete="email"
          />
          {errors.email && <div className="form-error">{errors.email}</div>}

          <label>First Name<span className="required">*</span></label>
          <input 
            type="text" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter first name"
            className={errors.firstName ? 'error' : ''}
            autoComplete="given-name"
          />
          {errors.firstName && <div className="form-error">{errors.firstName}</div>}

          <label>Last Name<span className="required">*</span></label>
          <input 
            type="text" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter last name"
            className={errors.lastName ? 'error' : ''}
            autoComplete="family-name"
          />
          {errors.lastName && <div className="form-error">{errors.lastName}</div>}

          <label>Phone Number<span className="required">*</span></label>
          <PhoneInput 
            value={formData.phone} 
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <div className="form-error">{errors.phone}</div>}

          <label>Job Title</label>
          <input 
            type="text" 
            name="jobTitle" 
            value={formData.jobTitle} 
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter job title (optional)"
            className={errors.jobTitle ? 'error' : ''}
            autoComplete="organization-title"
          />
          {errors.jobTitle && <div className="form-error">{errors.jobTitle}</div>}

          <label>Contact Owner</label>
          <select 
            name="contactOwner" 
            value={formData.contactOwner} 
            onChange={handleChange}
          >
            <option value="" disabled hidden>Choose contact owner</option>
            <option value="owner1">Owner 1</option>
            <option value="owner2">Owner 2</option>
            <option value="owner3">Owner 3</option>
          </select>

          <label>Lead Status</label>
          <select 
            name="leadStatus" 
            value={formData.leadStatus} 
            onChange={handleChange}
          >
            <option value="" >Choose status</option>
            <option value="Open">Open</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Converted">Converted</option>
          </select>

          <div className="button-row">
            <button type="button" className="white-button" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn--primary btn--md">Save </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LeadForm;