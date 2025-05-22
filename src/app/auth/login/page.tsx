'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FormField, LoadingSpinner } from '@/components/shared';
import { useAuth, useForm, useToast } from '@/lib/hooks';
import { isValidEmail } from '@/lib/utils';

/**
 * Login page component
 * Handles user authentication for both admin and student roles
 */
export default function LoginPage() {
  const { login, isLoading, error } = useAuth();
  const showToast = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form handling with validation
  const { values, errors, handleChange, validateForm, handleSubmit } = useForm(
    {
      email: '',
      password: '',
    },
    ['email', 'password']
  );

  // Custom validation for email format
  const validateEmail = () => {
    if (values.email && !isValidEmail(values.email)) {
      return 'البريد الإلكتروني غير صالح';
    }
    return '';
  };

  // Handle form submission
  const onSubmit = async () => {
    setIsSubmitting(true);
    
    // Validate email format
    const emailError = validateEmail();
    if (emailError) {
      showToast.showErrorToast('خطأ في البيانات', emailError);
      setIsSubmitting(false);
      return;
    }
    
    try {
      await login({
        email: values.email,
        password: values.password,
      });
      
      // If there's an error from the login process, it will be handled by the auth context
      if (error) {
        showToast.showErrorToast('فشل تسجيل الدخول', error);
      }
    } catch (err) {
      showToast.showErrorToast('خطأ غير متوقع', 'حدث خطأ أثناء محاولة تسجيل الدخول');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Background gradient colors
  const bgGradient = useColorModeValue(
    'linear(to-br, primary.50, secondary.50)',
    'linear(to-br, gray.800, gray.900)'
  );

  return (
    <Box 
      minH="100vh" 
      bgGradient={bgGradient}
      py={12}
      px={4}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative floating elements */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        width="150px"
        height="150px"
        borderRadius="full"
        bg="primary.100"
        opacity="0.5"
        filter="blur(40px)"
        animation="float 8s ease-in-out infinite"
      />
      <Box
        position="absolute"
        bottom="15%"
        right="10%"
        width="200px"
        height="200px"
        borderRadius="full"
        bg="secondary.100"
        opacity="0.6"
        filter="blur(50px)"
        animation="float 10s ease-in-out infinite alternate"
      />
      
      <Container maxW="md" position="relative" zIndex={1}>
        <Flex direction="column" align="center" mb={8}>
          <Image 
            src="/logo.png" 
            alt="الأستاذ" 
            width={120} 
            height={120} 
            mb={4}
            fallbackSrc="/home-dark-alostaz.png"
          />
          <Heading 
            as="h1" 
            size="xl" 
            textAlign="center"
            bgGradient="linear(to-l, primary.500, secondary.500)"
            bgClip="text"
          >
            مركز الأستاذ التعليمي
          </Heading>
          <Text color="gray.600" mt={2} textAlign="center">
            تسجيل الدخول إلى النظام
          </Text>
        </Flex>
        
        <Card 
          borderRadius="xl" 
          boxShadow="xl"
          overflow="hidden"
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            bottom: '-10px',
            left: '-10px',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            borderRadius: 'xl',
            zIndex: -1
          }}
        >
          <CardHeader pb={0}>
            <Heading size="md" textAlign="center">
              تسجيل الدخول
            </Heading>
          </CardHeader>
          
          <CardBody pt={6}>
            {isLoading ? (
              <LoadingSpinner text="جاري تسجيل الدخول..." />
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit);
              }}>
                <FormField
                  id="email"
                  name="email"
                  label="البريد الإلكتروني"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                  isRequired
                  placeholder="أدخل البريد الإلكتروني"
                />
                
                <FormField
                  id="password"
                  name="password"
                  label="كلمة المرور"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  error={errors.password}
                  isRequired
                  placeholder="أدخل كلمة المرور"
                />
                
                {error && (
                  <Text color="red.500" fontSize="sm" mt={2} textAlign="center">
                    {error}
                  </Text>
                )}
                
                <Button
                  mt={6}
                  colorScheme="primary"
                  size="lg"
                  width="full"
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="جاري تسجيل الدخول..."
                >
                  تسجيل الدخول
                </Button>
              </form>
            )}
          </CardBody>
        </Card>
        
        <Text mt={6} fontSize="sm" color="gray.600" textAlign="center">
          © {new Date().getFullYear()} مركز الأستاذ التعليمي. جميع الحقوق محفوظة.
        </Text>
      </Container>
    </Box>
  );
}
