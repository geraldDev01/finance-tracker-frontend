import { toast } from "react-toastify";

export const loginValidationRules = {
  email: [
    { required: true },
    { pattern: /\S+@\S+\.\S+/, message: "Invalid email format" },
  ],
  password: [{ required: true }],
};

export const RegisterValidationRules = {
  fullName: [{ required: true }],
  email: [
    { required: true },
    { pattern: /\S+@\S+\.\S+/, message: "Invalid email format" },
  ],
  password: [{ required: true }],
};

export const validateForm = (formData, validationRules) => {
  const errors = {};

  for (const field in validationRules) {
    const rules = validationRules[field];

    for (const rule of rules) {
      if (rule.required && !formData[field]) {
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
        break;
      }

      if (rule.pattern && !rule.pattern.test(formData[field])) {
        errors[field] = rule.message || `Invalid ${field}`;
        break;
      }
    }
  }

  return errors;
};

export const showToast = (message, type = "info", options = {}) => {
  const defaultOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  };

  const toastType = {
    info: toast.info,
    success: toast.success,
    warning: toast.warning,
    error: toast.error,
  }[type];

  if (!toastType) {
    console.error("Invalid toast type.");
    return;
  }

  const toastOptions = { ...defaultOptions, ...options };

  toastType(message, toastOptions);
};
