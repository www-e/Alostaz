import React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtl from 'stylis-plugin-rtl';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// Create rtl cache
const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [rtl],
});

// Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  direction: 'rtl',
  fonts: {
    heading: 'var(--font-cairo), sans-serif',
    body: 'var(--font-cairo), sans-serif',
  },
  colors: {
    primary: {
      50: '#e6f7ff',
      100: '#b3e0ff',
      200: '#80caff',
      300: '#4db3ff',
      400: '#1a9dff',
      500: '#0080ff',
      600: '#0066cc',
      700: '#004d99',
      800: '#003366',
      900: '#001a33',
    },
    secondary: {
      50: '#fff5e6',
      100: '#ffe0b3',
      200: '#ffcc80',
      300: '#ffb84d',
      400: '#ffa31a',
      500: '#ff8c00',
      600: '#cc7000',
      700: '#995400',
      800: '#663800',
      900: '#331c00',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      defaultProps: {
        colorScheme: 'primary',
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
      },
    },
    Table: {
      variants: {
        simple: {
          th: {
            bg: 'gray.100',
            color: 'gray.800',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 'wider',
          },
        },
      },
    },
  },
});

interface RTLProviderProps {
  children: React.ReactNode;
}

/**
 * RTL Provider component for Arabic language support
 * Wraps the application with RTL direction and custom theme
 */
export const RTLProvider: React.FC<RTLProviderProps> = ({ children }) => {
  return (
    <CacheProvider value={rtlCache}>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
};
