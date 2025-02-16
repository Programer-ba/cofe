import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints, mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  // useSystemColorMode: true,
};

const fonts = { mono: 'Menlo, monospace' };

const breakpoints = createBreakpoints({
  sm: '20em',
  md: '40em',
  lg: '60em',
  xl: '80em',
  '2xl': '96em',
});

export const theme = extendTheme({
  config,
  colors: {
    // black: '#16161D',
  },
  fonts,
  breakpoints,
  components: {
    Accordion: {
      baseStyle: {
        container: {
          borderTopWidth: 0,
          _last: {
            borderBottomWidth: 0,
          },
        },
      },
    },
    Link: {
      transition: 'color 0.2s',
      baseStyle: {
        _hover: {
          color: 'teal',
        },
      },
    },
    Paper: {
      baseStyle: (props) => ({
        bg: mode('gray.50', 'gray.900')(props),
      }),
    },
    Card: {
      baseStyle: {
        py: 2,
      },
    },
    Toolbar: {
      baseStyle: {
        display: 'flex',
        zIndex: 2,
        minH: 12,
        px: 4,
        gridGap: 2,
        alignItems: 'center',
      },
      sizes: {
        xs: {
          minH: 4,
          gridGap: 0.5,
        },
        sm: {
          minH: 8,
          gridGap: 1,
        },
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: 'body',
        color: mode('gray.800', 'gray.100')(props),
        bg: mode('gray.100', 'gray.800')(props),
        transitionProperty: 'background-color',
        transitionDuration: 'normal',
        lineHeight: 'base',
      },
      '*::placeholder': {
        color: mode('gray.400', 'whiteAlpha.400')(props),
      },
      '*, *::before, &::after': {
        borderColor: mode('gray.200', 'whiteAlpha.300')(props),
        wordWrap: 'break-word',
      },
    }),
  },
});
