// Common validation patterns and rules

export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const phonePattern = /^[+]?[1-9][\d]{0,15}$/;

// Validation test functions
export const validationTests = {
  required: (value) => value && value.trim().length > 0,
  email: (value) => {
    const trimmed = value.trim();
    const result = emailPattern.test(trimmed);
    return result;
  },
  minLength: (min) => (value) => value && value.length >= min,
  maxLength: (max) => (value) => value && value.length <= max,
  phone: (value) => {
    if (!value.trim()) return true; // Optional field
    const cleanPhone = value.replace(/[\s\-\(\)\.]/g, "");
    return phonePattern.test(cleanPhone);
  },
  passwordMatch: (value, form) => {
    if (!form || !form.password) return false;
    return value === form.password;
  },
  selectRequired: (value) => value && value !== "",
};

// Validation messages
export const validationMessages = {
  required: (field) => `${field} is required`,
  email: "Please enter a valid email address",
  minLength: (min) => `Must be at least ${min} characters`,
  maxLength: (max) => `Must be no more than ${max} characters`,
  phone: "Please enter a valid phone number (e.g., +1234567890 or 1234567890)",
  passwordMatch: "Passwords do not match",
  selectRequired: (field) => `Please select a ${field}`,
};

// Common validation rules for auth forms
export const authValidationRules = {
  // Login validation
  login: {
    email: [
      { test: validationTests.required, message: validationMessages.required("Email") },
      { test: validationTests.email, message: validationMessages.email }
    ],
    password: [
      { test: validationTests.required, message: validationMessages.required("Password") },
      { test: validationTests.minLength(6), message: validationMessages.minLength(6) }
    ]
  },

  // Register validation
  register: {
    firstName: [
      { test: validationTests.required, message: validationMessages.required("First name") },
      { test: validationTests.minLength(2), message: validationMessages.minLength(2) }
    ],
    lastName: [
      { test: validationTests.required, message: validationMessages.required("Last name") },
      { test: validationTests.minLength(2), message: validationMessages.minLength(2) }
    ],
    email: [
      { test: validationTests.required, message: validationMessages.required("Email") },
      { test: validationTests.email, message: validationMessages.email }
    ],
    phone: [
      { test: validationTests.phone, message: validationMessages.phone }
    ],
    password: [
      { test: validationTests.required, message: validationMessages.required("Password") },
      { test: validationTests.minLength(6), message: validationMessages.minLength(6) }
    ],
    confirmPassword: [
      { test: validationTests.required, message: "Please confirm your password" },
      { test: validationTests.passwordMatch, message: validationMessages.passwordMatch }
    ],
    industry: [
      { test: validationTests.selectRequired, message: validationMessages.selectRequired("industry") }
    ]
  },

  // Forgot password validation
  forgotPassword: {
    email: [
      { test: validationTests.required, message: validationMessages.required("Email") },
      { test: validationTests.email, message: validationMessages.email }
    ]
  },

  // Reset password validation
  resetPassword: {
    password: [
      { test: validationTests.required, message: validationMessages.required("Password") },
      { test: validationTests.minLength(6), message: validationMessages.minLength(6) }
    ],
    confirmPassword: [
      { test: validationTests.required, message: "Please confirm your password" },
      { test: validationTests.passwordMatch, message: validationMessages.passwordMatch }
    ]
  }
};

// Validation rules for CompanyFormDialog
export const companyValidationRules = {
  domain: [
    { test: validationTests.required, message: validationMessages.required("Domain name") }
  ],
  name: [
    { test: validationTests.required, message: validationMessages.required("Company name") }
  ],
  owner: [
    { test: validationTests.required, message: validationMessages.required("Company owner") }
  ],
  industry: [
    { test: validationTests.selectRequired, message: validationMessages.selectRequired("industry") }
  ],
  type: [
    { test: validationTests.selectRequired, message: validationMessages.selectRequired("type") }
  ],
  city: [],
  country: [],
  employees: [],
  revenue: [],
  phone: [
    { test: validationTests.required, message: validationMessages.required("Phone number") },
    { test: validationTests.phone, message: validationMessages.phone }
  ]
};

// Validation rules for LeadFormDialog
export const leadValidationRules = {
  email: [
    { test: validationTests.required, message: validationMessages.required("Email") },
    { test: validationTests.email, message: validationMessages.email }
  ],
  firstName: [
    { test: validationTests.required, message: validationMessages.required("First name") },
    { test: validationTests.minLength(2), message: validationMessages.minLength(2) }
  ],
  lastName: [
    { test: validationTests.required, message: validationMessages.required("Last name") },
    { test: validationTests.minLength(2), message: validationMessages.minLength(2) }
  ],
  phone: [
    { test: validationTests.phone, message: validationMessages.phone }
  ],
  jobTitle: [
    { test: validationTests.maxLength(50), message: validationMessages.maxLength(50) }
  ],
  contactOwner: [],
  leadStatus: []
};

// Generic form validation function
export function validateForm(formData, rules) {
  const errors = {};
  Object.keys(rules).forEach((field) => {
    for (const rule of rules[field]) {
      if (!rule.test(formData[field], formData)) {
        errors[field] = rule.message;
        break; // Only show the first error per field
      }
    }
  });
  return errors;
} 