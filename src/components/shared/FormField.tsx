import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Textarea,
  Checkbox,
  InputGroup,
  InputRightElement,
  Button,
  Box
} from '@chakra-ui/react';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox';
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  min?: number | string;
  max?: number | string;
  isChecked?: boolean;
}

/**
 * A reusable form field component that supports various input types
 * Provides consistent styling and error handling across the application
 */
const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  helperText,
  isRequired = false,
  isDisabled = false,
  placeholder,
  options = [],
  min,
  max,
  isChecked
}) => {
  // State for password visibility toggle
  const [showPassword, setShowPassword] = React.useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <FormControl
      id={id}
      isRequired={isRequired}
      isInvalid={!!error}
      isDisabled={isDisabled}
      mb={4}
    >
      {type !== 'checkbox' && (
        <FormLabel htmlFor={id} fontWeight="medium">
          {label}
        </FormLabel>
      )}

      {type === 'text' || type === 'email' || type === 'number' || type === 'date' ? (
        <Input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          min={min}
          max={max}
          borderRadius="md"
          focusBorderColor="primary.500"
          dir={type === 'number' || type === 'date' ? 'ltr' : 'rtl'}
        />
      ) : type === 'password' ? (
        <InputGroup>
          <Input
            id={id}
            name={name}
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            borderRadius="md"
            focusBorderColor="primary.500"
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handlePasswordVisibility}
              variant="ghost"
            >
              {showPassword ? 'إخفاء' : 'عرض'}
            </Button>
          </InputRightElement>
        </InputGroup>
      ) : type === 'select' ? (
        <Select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          borderRadius="md"
          focusBorderColor="primary.500"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : type === 'textarea' ? (
        <Textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          borderRadius="md"
          focusBorderColor="primary.500"
          resize="vertical"
          minH="100px"
        />
      ) : type === 'checkbox' ? (
        <Box pt={2}>
          <Checkbox
            id={id}
            name={name}
            isChecked={isChecked}
            onChange={onChange}
            colorScheme="primary"
          >
            {label}
          </Checkbox>
        </Box>
      ) : null}

      {error ? (
        <FormErrorMessage>{error}</FormErrorMessage>
      ) : helperText ? (
        <FormHelperText>{helperText}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default FormField;
