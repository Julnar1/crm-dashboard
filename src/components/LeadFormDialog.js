import React, { useState, useEffect } from "react";
import PhoneInput from "./PhoneInput";
import { toast } from "react-toastify";
import { leadValidationRules, validateForm } from '../utils/validation';

const initialFormState = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  jobTitle: "",
  contactOwner: "",
  leadStatus: "",
};

const LeadFormDialog = ({ open, onClose, onSave, initialData, loading = false }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialFormState,
        ...initialData,
        leadStatus: initialData.leadStatus || initialData.status || "",
      });
    } else {
      setFormData(initialFormState);
    }
  }, [initialData, open]);
  
  useEffect(() => {
    if (open) {
      setErrors({});
      setTouched({});
    }
  }, [open, initialData]);

  const validate = (fieldName = null) => {
    if (fieldName) {
      // Validate single field
      const fieldRule = { [fieldName]: leadValidationRules[fieldName] || [] };
      const fieldData = { [fieldName]: formData[fieldName] };
      const fieldError = validateForm(fieldData, fieldRule);
      setErrors(prev => ({ ...prev, ...fieldError }));
      return Object.keys(fieldError).length === 0;
    } else {
      // Validate all fields
      const newErrors = validateForm(formData, leadValidationRules);
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field and validate in real-time if field was touched
    if (touched[name]) {
      validate(name);
    }
  };

  const handlePhoneChange = (phone) => {
    setFormData((prev) => ({
      ...prev,
      phone,
    }));
    
    // Clear error for phone field and validate in real-time if field was touched
    if (touched.phone) {
      validate('phone');
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    validate(name);
  };

  const handlePhoneBlur = () => {
    setTouched((prev) => ({ ...prev, phone: true }));
    
    // Validate phone field on blur
    validate('phone');
  };

  const handleSubmit = (e) => {
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
    
    if (!validate()) {
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.focus();
      }
      return;
    }
    
    if (loading) return; // Prevent submission while loading
    
    // Clean data before submission
    const cleanedData = {
      ...formData,
      email: formData.email.trim().toLowerCase(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phone: formData.phone.trim(),
      jobTitle: formData.jobTitle.trim(),
    };
    
    onSave(cleanedData);
  };

  if (!open) return null;

  return (
    <>
      <div className="create-lead-overlay" onClick={onClose} />
      <div className="create-lead-drawer">
        <div className="create-lead-header">
          <h3>{initialData ? "Edit Lead" : "Create Lead"}</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="create-lead-form" noValidate>
          <div className="row mb-1">
            <div className="col">
              <label className="form-label">Email <span className="text-danger">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter email address"
                disabled={loading}
                autoComplete="email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
          </div>
          
          <div className="row mb-1">
            <div className="col">
              <label className="form-label">First Name <span className="text-danger">*</span></label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                placeholder="Enter first name"
                disabled={loading}
                autoComplete="given-name"
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>
            <div className="col">
              <label className="form-label">Last Name <span className="text-danger">*</span></label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                placeholder="Enter last name"
                disabled={loading}
                autoComplete="family-name"
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>
          </div>
          
          <div className="row mb-1">
            <div className="col">
              <label className="form-label">Phone Number <span className="text-danger">*</span></label>
              <PhoneInput
                value={formData.phone}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                className={errors.phone ? 'is-invalid' : ''}
                disabled={loading}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
            <div className="col">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${errors.jobTitle ? "is-invalid" : ""}`}
                placeholder="Enter job title (optional)"
                disabled={loading}
                autoComplete="organization-title"
              />
              {errors.jobTitle && <div className="invalid-feedback">{errors.jobTitle}</div>}
            </div>
          </div>
          
          <div className="row mb-1">
            <div className="col">
              <label className="form-label">Contact Owner</label>
              <select
                name="contactOwner"
                value={formData.contactOwner}
                onChange={handleChange}
                className="form-select"
                disabled={loading}
              >
                <option value="">Choose contact owner</option>
                <option value="owner1">Owner 1</option>
                <option value="owner2">Owner 2</option>
                <option value="owner3">Owner 3</option>
              </select>
            </div>
            <div className="col">
              <label className="form-label">Lead Status</label>
              <select
                name="leadStatus"
                value={formData.leadStatus}
                onChange={handleChange}
                className="form-select"
                disabled={loading}
              >
                <option value="">Choose status</option>
                <option value="Open">Open</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Converted">Converted</option>
              </select>
            </div>
          </div>
          
          <div className="create-lead-footer">
            <button 
              type="button" 
              className="btn btn-outline-secondary" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LeadFormDialog;
