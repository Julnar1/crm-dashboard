import React, { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { toast } from "react-toastify";
import { companyValidationRules, validateForm } from '../utils/validation';

const initialFormState = {
  domain: "",
  name: "",
  owner: "",
  industry: "",
  type: "",
  city: "",
  country: "",
  employees: "",
  revenue: "",
  phone: "",
  createdDate: "",
};

const industryOptions = [
  "Legal Services", "Healthcare", "Real Estate", "Financial Advisory",
  "Retail & E-Commerce", "Logistics & Supply Chain", "Marketing Agencies", "Education Technology"
];
const typeOptions = ["Customer", "Partner", "Vendor", "Others"];

const CompanyFormDialog = ({ open, onClose, onSave, initialData, loading = false }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialFormState,
        ...initialData,
      });
    } else {
      setFormData(initialFormState);
    }
  }, [initialData, open]);
  
  useEffect(() => {
    if (open) {
      setErrors({});
    }
  }, [open, initialData]);

  const validate = () => {
    const newErrors = validateForm(formData, companyValidationRules);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate a single field on blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldRule = { [name]: companyValidationRules[name] || [] };
    const fieldData = { ...formData, [name]: value };
    const fieldError = validateForm(fieldData, fieldRule);
    setErrors((prev) => ({ ...prev, [name]: fieldError[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (loading) return; // Prevent submission while loading
    onSave(formData);
  };

  if (!open) return null;

  return (
    <>
      <div className="create-company-overlay" onClick={onClose} />
      <div className="create-company-drawer">
        <div className="create-company-header">
          <h3>{initialData ? "Edit Company" : "Create Company"}</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="create-company-form" noValidate>
          <div className="row mb-1">
            <div className="col">
              <label className="form-label">Domain Name <span className="text-danger">*</span></label>
              <input
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${errors.domain ? "is-invalid" : ""}`}
                placeholder="Enter"
                disabled={loading}
              />
              {errors.domain && <div className="invalid-feedback">{errors.domain}</div>}
            </div>
          </div>
          <div className="row mb-1">
            <div className="col">
              <label className="form-label">Company Name <span className="text-danger">*</span></label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter"
                disabled={loading}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
          </div>
          <div className="row mb-1">
            <div className="col">
              <label className="form-label">Company Owner <span className="text-danger">*</span></label>
              <input
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${errors.owner ? "is-invalid" : ""}`}
                placeholder="Enter"
                disabled={loading}
              />
              {errors.owner && <div className="invalid-feedback">{errors.owner}</div>}
            </div>
          </div>
          <div className="row mb-1">
            <div className="col">
              <label className="form-label">Industry <span className="text-danger">*</span></label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-select ${errors.industry ? "is-invalid" : ""}`}
                disabled={loading}
              >
                <option value="">Choose</option>
                {industryOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
              {errors.industry && <div className="invalid-feedback">{errors.industry}</div>}
            </div>
            <div className="col">
              <label className="form-label">Type <span className="text-danger">*</span></label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-select ${errors.type ? "is-invalid" : ""}`}
                disabled={loading}
              >
                <option value="">Choose</option>
                {typeOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
              {errors.type && <div className="invalid-feedback">{errors.type}</div>}
            </div>
          </div>
          <div className="row mb-1">
            <div className="col">
              <label className="form-label">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter"
                className={`form-control ${errors.city ? "is-invalid" : ""}`}
                disabled={loading}
              />
            </div>
            <div className="col">
              <label className="form-label">Country/Region</label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter"
                className={`form-control ${errors.country ? "is-invalid" : ""}`}
                disabled={loading}
              />
            </div>
          </div>
          <div className="row mb-1">
            <div className="col">
              <label className="form-label">No of Employees</label>
              <input
                name="employees"
                value={formData.employees}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter"
                className={`form-control ${errors.employees ? "is-invalid" : ""}`}
                disabled={loading}
              />
            </div>
            <div className="col">
              <label className="form-label">Annual Revenue</label>
              <input
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter"
                className={`form-control ${errors.revenue ? "is-invalid" : ""}`}
                disabled={loading}
              />
            </div>
          </div>
              <div className="row mb-1">
            <div className="col">
              <label className="form-label">Phone Number <span className="text-danger">*</span></label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className ={`form-control ${errors.phone ? "is-invalid" : ""}`}
                placeholder="Enter"
                disabled={loading}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
          </div>
          <div className="create-company-footer">
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

export default CompanyFormDialog;