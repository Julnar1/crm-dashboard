import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearError, resetStatus } from '../redux/slices/authSlice';

export const useAuthForm = (
  initialForm,
  validationRules,
  actionCreator,
  successMessage,
  statusKey,
  onSuccess // <-- new parameter
) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [lastError, setLastError] = useState(null);
  
  const dispatch = useDispatch();
  
  // Get loading and error states from Redux
  const isLoading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);
  
  // Get the appropriate status based on the statusKey
  const status = useSelector(state => {
    if (statusKey === 'login') return state.auth.loginStatus;
    if (statusKey === 'register') return state.auth.registerStatus;
    if (statusKey === 'forgotPassword') return state.auth.forgotPasswordStatus;
    if (statusKey === 'resetPassword') return state.auth.resetPasswordStatus;
    return 'idle';
  });

  // Validation function
  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return "";
    
    for (const validation of rule) {
      const { test, message } = validation;
      try {
        // Handle validation functions that need access to the full form
        if (name === 'confirmPassword') {
          if (!test(value, form)) {
            return message;
          }
        } else {
          if (!test(value)) {
            return message;
          }
        }
      } catch (error) {
        console.error(`Validation error for field ${name}:`, error);
        return "Validation error";
      }
    }
    return "";
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  // Handle input blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all fields
    const newErrors = {};
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Dispatch action
    dispatch(actionCreator(form));
  };

  // Handle Redux state changes
  useEffect(() => {
    if (status === 'succeeded') {
      toast.success(successMessage);
      setForm(initialForm);
      setErrors({});
      if (onSuccess) onSuccess(); // <-- call the callback
      dispatch(resetStatus());
    } else if (status === 'failed' && error && error !== lastError) {
      //only show the error if it's different from the last error(ie new error)
      setLastError(error);
      toast.error(error);
      dispatch(clearError());
      dispatch(resetStatus());
    }
  }, [status, error, dispatch, successMessage, initialForm, onSuccess, lastError]);
  //reset the last error when the status is idle or succeeded
  useEffect(()=>{
    if(status === 'idle' || status === 'succeeded'){
      setLastError(null);
    }
  },[status]);

  return {
    form,
    errors,
    isLoading,
    handleChange,
    handleBlur,
    handleSubmit,
    setForm,
    setErrors
  };
}; 