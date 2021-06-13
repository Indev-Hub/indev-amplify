---
title: Theming
---

# Theming

Material-UI offers a utility function: `createTheme()` that creates a theme which can be passed to
the theme provider; otherwise the theme provider uses the default theme. The theme provider makes
the theme available in the component tree, and can be used via the `sx` prop, or inside styled
components using the Material-UI styled engine (`experimentalStyled`).

> Please disregard the "experimental" part of the style engine name, this is because the app uses the Alpha version of the
> Material UI. We will provide a patch once this is no longer an alpha version.

## Creating a theme

The app allows you to choose between multiple theme setups, thus a wrapper was created over
the `createTheme`. Currently, the function accepts a configuration object with the following keys:

- `direction` [ 'ltr' | 'rtl' ] - Sets the text direction. If you need RTL support, please ensure
  you use `RTL` component.
- `responsiveFontSizes` [ boolean ] - Adaptive font size for small devices.
- `roundedCorners` [ boolean ] - Increase the default border radius to 16px.
- `theme` [ 'LIGHT' | 'DARK' | 'NATURE' ] - Select a specific theme configuration. You can add your
  own styling or adjust current options.

```jsx
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from './theme';

const App = () => {
  const theme = createTheme({
    direction: 'ltr',
    responsiveFontSizes: true,
    roundedCorners: true,
    theme: 'DARK'
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        content
      </div>
    </ThemeProvider>
  );
}
```

## Nested themes

Multiple themes can be nested. The app implements this behaviour to display the components on
light/dark palette mode without changing the app global theme.

```jsx
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from './theme';

const App = () => {
  const theme = createTheme({
    direction: 'ltr',
    responsiveFontSizes: true,
    roundedCorners: true,
    theme: 'DARK'
  });

  const theme2 = createTheme({
    theme: 'LIGHT'
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div>Main theme</div>
        <ThemeProvider theme={theme2}>
          <div>Inner theme</div>
        </ThemeProvider>
      </div>
    </ThemeProvider>
  );
}
```
