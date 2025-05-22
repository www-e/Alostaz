/**
 * Chakra UI v3 Compatibility Layer
 * 
 * This file provides compatibility components for Chakra UI v3,
 * which has significant API changes from previous versions.
 */

import {
  Card as ChakraCard,
  CardProps,
  Stack as ChakraStack,
  StackProps,
  Button as ChakraButton,
  ButtonProps,
  Text as ChakraText,
  TextProps,
  Textarea as ChakraTextarea,
  TextareaProps,
  Image as ChakraImage,
  ImageProps,
  Select as ChakraSelect,
  SelectProps,
  Table as ChakraTable,
  TableProps,
  createStyleContext,
} from '@chakra-ui/react'
import React, { forwardRef, ReactNode } from 'react'

// Card components
const [CardStylesProvider, useCardStyles] = createStyleContext('Card')

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => (
  <ChakraCard ref={ref} {...props} />
))

export const CardHeader = forwardRef<HTMLDivElement, CardProps>((props, ref) => (
  <ChakraCard.Header ref={ref} {...props} />
))

export const CardBody = forwardRef<HTMLDivElement, CardProps>((props, ref) => (
  <ChakraCard.Body ref={ref} {...props} />
))

export const CardFooter = forwardRef<HTMLDivElement, CardProps>((props, ref) => (
  <ChakraCard.Footer ref={ref} {...props} />
))

// Stack with spacing
export interface ExtendedStackProps extends StackProps {
  spacing?: number | string
}

export const Stack = forwardRef<HTMLDivElement, ExtendedStackProps>(
  ({ spacing, ...props }, ref) => (
    <ChakraStack ref={ref} gap={spacing} {...props} />
  )
)

export const HStack = forwardRef<HTMLDivElement, ExtendedStackProps>(
  ({ spacing, ...props }, ref) => (
    <ChakraStack ref={ref} direction="row" gap={spacing} {...props} />
  )
)

export const VStack = forwardRef<HTMLDivElement, ExtendedStackProps>(
  ({ spacing, ...props }, ref) => (
    <ChakraStack ref={ref} direction="column" gap={spacing} {...props} />
  )
)

// Button with icons
interface ExtendedButtonProps extends ButtonProps {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  isLoading?: boolean
  loadingText?: string
}

export const Button = forwardRef<HTMLButtonElement, ExtendedButtonProps>(
  ({ leftIcon, rightIcon, isLoading, loadingText, children, ...props }, ref) => (
    <ChakraButton 
      ref={ref} 
      loading={isLoading}
      loadingText={loadingText}
      {...props}
    >
      {leftIcon && <span style={{ marginRight: '0.5rem' }}>{leftIcon}</span>}
      {children}
      {rightIcon && <span style={{ marginLeft: '0.5rem' }}>{rightIcon}</span>}
    </ChakraButton>
  )
)

// Text with noOfLines
interface ExtendedTextProps extends TextProps {
  noOfLines?: number
}

export const Text = forwardRef<HTMLParagraphElement, ExtendedTextProps>(
  ({ noOfLines, ...props }, ref) => (
    <ChakraText 
      ref={ref} 
      overflow={noOfLines ? 'hidden' : undefined}
      textOverflow={noOfLines ? 'ellipsis' : undefined}
      display={noOfLines ? '-webkit-box' : undefined}
      style={noOfLines ? {
        WebkitLineClamp: noOfLines,
        WebkitBoxOrient: 'vertical',
      } : undefined}
      {...props} 
    />
  )
)

// Textarea with isInvalid
interface ExtendedTextareaProps extends TextareaProps {
  isInvalid?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, ExtendedTextareaProps>(
  ({ isInvalid, ...props }, ref) => (
    <ChakraTextarea 
      ref={ref} 
      _invalid={isInvalid ? { borderColor: 'red.500' } : undefined}
      {...props} 
    />
  )
)

// Image with fallbackSrc
interface ExtendedImageProps extends ImageProps {
  fallbackSrc?: string
}

export const Image = forwardRef<HTMLImageElement, ExtendedImageProps>(
  ({ fallbackSrc, ...props }, ref) => (
    <ChakraImage 
      ref={ref} 
      fallback={fallbackSrc ? <div style={{ 
        background: '#f0f0f0',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>Image</div> : undefined}
      {...props} 
    />
  )
)

// Select component
export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => (
  <ChakraSelect ref={ref} {...props} />
))

// Table components
export const Table = forwardRef<HTMLTableElement, TableProps>((props, ref) => (
  <ChakraTable ref={ref} {...props} />
))

export const Thead = forwardRef<HTMLTableSectionElement, any>((props, ref) => (
  <thead ref={ref} {...props} />
))

export const Tbody = forwardRef<HTMLTableSectionElement, any>((props, ref) => (
  <tbody ref={ref} {...props} />
))

export const Tr = forwardRef<HTMLTableRowElement, any>((props, ref) => (
  <tr ref={ref} {...props} />
))

export const Th = forwardRef<HTMLTableCellElement, any>((props, ref) => (
  <th ref={ref} {...props} />
))

export const Td = forwardRef<HTMLTableCellElement, any>((props, ref) => (
  <td ref={ref} {...props} />
))

export const TableContainer = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div ref={ref} style={{ overflowX: 'auto', width: '100%' }} {...props} />
))

// Stat components
export const Stat = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div ref={ref} {...props} style={{ padding: '0.5rem', ...props.style }} />
))

export const StatLabel = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div ref={ref} {...props} style={{ 
    fontSize: '0.875rem', 
    color: 'gray', 
    marginBottom: '0.25rem',
    ...props.style 
  }} />
))

export const StatNumber = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div ref={ref} {...props} style={{ 
    fontSize: '1.5rem', 
    fontWeight: 'bold',
    ...props.style 
  }} />
))

export const StatHelpText = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div ref={ref} {...props} style={{ 
    fontSize: '0.75rem', 
    color: 'gray',
    marginTop: '0.25rem',
    ...props.style 
  }} />
))

// Progress component
export const Progress = forwardRef<HTMLDivElement, any>(({ value, max = 100, ...props }, ref) => (
  <div 
    ref={ref} 
    style={{ 
      width: '100%', 
      height: '0.5rem', 
      backgroundColor: '#e2e8f0',
      borderRadius: '0.25rem',
      overflow: 'hidden',
      ...props.style 
    }}
  >
    <div 
      style={{ 
        width: `${(value / max) * 100}%`, 
        height: '100%', 
        backgroundColor: props.colorScheme ? `var(--chakra-colors-${props.colorScheme}-500)` : 'blue',
        transition: 'width 0.3s ease-in-out'
      }} 
    />
  </div>
))

// Divider component
export const Divider = forwardRef<HTMLDivElement, any>((props, ref) => (
  <hr 
    ref={ref} 
    {...props} 
    style={{ 
      border: 'none', 
      borderTop: '1px solid', 
      borderColor: 'inherit',
      margin: '1rem 0',
      ...props.style 
    }} 
  />
))

// Alert components
export const Alert = forwardRef<HTMLDivElement, any>(({ status = 'info', ...props }, ref) => {
  const getStatusColor = () => {
    switch (status) {
      case 'error': return '#FED7D7';
      case 'success': return '#C6F6D5';
      case 'warning': return '#FEEBC8';
      default: return '#BEE3F8';
    }
  }
  
  return (
    <div 
      ref={ref} 
      {...props} 
      style={{ 
        padding: '1rem',
        borderRadius: '0.375rem',
        backgroundColor: getStatusColor(),
        display: 'flex',
        alignItems: 'center',
        ...props.style 
      }} 
    />
  )
})

export const AlertIcon = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div 
    ref={ref} 
    {...props} 
    style={{ 
      marginRight: '0.75rem',
      ...props.style 
    }} 
  >
    ⚠️
  </div>
))

// Tabs components
export const Tabs = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div ref={ref} {...props} style={{ width: '100%', ...props.style }} />
))

export const TabList = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div 
    ref={ref} 
    {...props} 
    style={{ 
      display: 'flex',
      borderBottom: '1px solid',
      borderColor: 'inherit',
      ...props.style 
    }} 
  />
))

export const Tab = forwardRef<HTMLButtonElement, any>((props, ref) => (
  <button 
    ref={ref} 
    type="button"
    {...props} 
    style={{ 
      padding: '0.5rem 1rem',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      borderBottom: '2px solid transparent',
      ...props.style 
    }} 
  />
))

export const TabPanels = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div ref={ref} {...props} style={{ padding: '1rem 0', ...props.style }} />
))

export const TabPanel = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div ref={ref} {...props} />
))

// Modal components
export const Modal = forwardRef<HTMLDivElement, any>(({ isOpen, children, ...props }, ref) => {
  if (!isOpen) return null
  
  return (
    <div 
      ref={ref} 
      {...props} 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        ...props.style 
      }} 
    >
      {children}
    </div>
  )
})

export const ModalOverlay = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div 
    ref={ref} 
    {...props} 
    style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.4)',
      ...props.style 
    }} 
  />
))

export const ModalContent = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div 
    ref={ref} 
    {...props} 
    style={{ 
      position: 'relative',
      background: 'white',
      borderRadius: '0.375rem',
      maxWidth: '32rem',
      width: '100%',
      zIndex: 1001,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      ...props.style 
    }} 
  />
))

export const ModalHeader = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div 
    ref={ref} 
    {...props} 
    style={{ 
      padding: '1rem',
      fontWeight: 'bold',
      fontSize: '1.25rem',
      borderBottom: '1px solid',
      borderColor: 'inherit',
      ...props.style 
    }} 
  />
))

export const ModalBody = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div 
    ref={ref} 
    {...props} 
    style={{ 
      padding: '1rem',
      ...props.style 
    }} 
  />
))

export const ModalFooter = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div 
    ref={ref} 
    {...props} 
    style={{ 
      padding: '1rem',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.5rem',
      borderTop: '1px solid',
      borderColor: 'inherit',
      ...props.style 
    }} 
  />
))

export const ModalCloseButton = forwardRef<HTMLButtonElement, any>((props, ref) => (
  <button 
    ref={ref} 
    type="button"
    {...props} 
    style={{ 
      position: 'absolute',
      top: '0.75rem',
      right: '0.75rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.25rem',
      ...props.style 
    }} 
  >
    ×
  </button>
))

// Form components
export const FormControl = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div 
    ref={ref} 
    {...props} 
    style={{ 
      marginBottom: '1rem',
      ...props.style 
    }} 
  />
))

export const FormLabel = forwardRef<HTMLLabelElement, any>((props, ref) => (
  <label 
    ref={ref} 
    {...props} 
    style={{ 
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: 'medium',
      ...props.style 
    }} 
  />
))

// Color mode
export const useColorModeValue = (lightValue: any, darkValue: any) => {
  // In a real implementation, this would check the actual color mode
  // For now, we'll just return the light value
  return lightValue
}

// Export all components
export {
  // Re-export original components
  ChakraCard,
  ChakraStack,
  ChakraButton,
  ChakraText,
  ChakraTextarea,
  ChakraImage,
  ChakraSelect,
  ChakraTable,
}
