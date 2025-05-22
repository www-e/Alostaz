import { useState, useCallback } from 'react';
import { validateRequiredFields, getValidationErrorMessage } from '../utils/validation';

/**
 * Custom hook for form handling with validation
 */
export const useForm = <T extends Record<string, any>>(initialValues: T, requiredFields: (keyof T)[] = []) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when it's changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  // Handle checkbox change
  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setValues(prev => ({ ...prev, [name]: checked }));
  }, []);

  // Set a specific field value
  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when it's changed
    if (errors[name as string]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as string];
        return newErrors;
      });
    }
  }, [errors]);

  // Validate the form
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    // Check required fields
    const missingFields = validateRequiredFields(
      values, 
      requiredFields as string[]
    );
    
    missingFields.forEach(field => {
      newErrors[field] = getValidationErrorMessage(field);
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, requiredFields]);

  // Reset the form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (onSubmit: (values: T) => Promise<void> | void) => {
      setIsSubmitting(true);
      
      if (validateForm()) {
        try {
          await onSubmit(values);
        } catch (error) {
          console.error('Form submission error:', error);
        }
      }
      
      setIsSubmitting(false);
    },
    [values, validateForm]
  );

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleCheckboxChange,
    setFieldValue,
    validateForm,
    resetForm,
    handleSubmit
  };
};
