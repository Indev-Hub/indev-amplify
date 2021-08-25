import merge from 'lodash/merge';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { THEMES } from '../constants';
import { lightShadows, darkShadows } from './shadows';

const baseOptions = {
  direction: 'ltr',
  components: {
    MuiAvatar: {
      styleOverrides: {
        fallback: {
          height: '75%',
          width: '75%'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6'
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: 'hidden'
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: '16px'
        }
      }
    }
  },
  button: {
    backgroundColor: 'EC008C'
  },
  typography: {
    button: {
      fontWeight: 600
    },
    fontFamily: 'DM Sans',
    h1: {
      fontWeight: 600,
      fontSize: '3rem'
    },
    h2: {
      fontWeight: 500,
      fontSize: '2.5rem'
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem'
    },
    h4: {
      fontWeight: 400,
      fontSize: '1.25rem'
    },
    h5: {
      fontWeight: 400,
      fontSize: '1rem'
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: '1'
    },
    subTitle: {
      fontWeight: 500,
      fontSize: '.85rem',
      fontFamily: 'DM Sans'
    },
    overline: {
      fontWeight: 600
    }
  },
  brand: {
    primary0: '#ffffff',
    primary1: '#27AAE1',
    primary2: '#EC008C',
    background0: '#ffffff',
    background1: '#141944',
    background2: '#ededed'
  }
};

const overrideOptions = {
  MuiContainerRoot: {
    padding: 0,
    marging: 0
  }
};

const themesOptions = {
  [THEMES.LIGHT]: {
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&::placeholder': {
              opacity: 0.86,
              color: '#42526e'
            }
          }
        }
      }
    },
    palette: {
      brand: {
        primary0: '#ffffff',
        primary1: '#27AAE1',
        primary2: '#EC008C',
        primary2hover: '#EE1558',
        background0: '#ffffff',
        background1: '#141944',
        background2: '#ededed'
      },
      chip: {
        chip1: 'grey',
        chip2: 'orange',
        chip3: 'purple',
        chip4: 'magenta',
        chip5: 'cyan'
      },
      navbar: {
        default: '#141944',
        paper: '#27AAE1'
      },
      action: {
        active: '#27AAE1'
      },
      background: {
        default: '#ededed',
        paper: '#ffffff'
      },
      error: {
        contrastText: '#ffffff',
        main: '#f44336'
      },
      mode: 'light',
      primary: {
        contrastText: '#ffffff',
        main: '#27AAE1'
      },
      success: {
        contrastText: '#ffffff',
        main: '#4caf50'
      },
      text: {
        primary: '#141944',
        secondary: '#141944',
        reverse: '#ffffff'
      },
      warning: {
        contrastText: '#ffffff',
        main: '#ff9800'
      }
    },
    shadows: lightShadows
  },
  [THEMES.DARK]: {
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid rgba(145, 158, 171, 0.24)'
          }
        }
      }
    },
    palette: {
      brand: {
        primary0: '#ffffff',
        primary1: '#27AAE1',
        primary2: '#EC008C',
        background0: '#ffffff',
        background1: '#141944',
        background2: '#ededed'
      },
      navbar: {
        default: '#171c24',
        paper: '#141944'
      },
      background: {
        default: '#141944',
        paper: '#000000'
      },
      divider: 'rgba(145, 158, 171, 0.24)',
      error: {
        contrastText: '#ffffff',
        main: '#f44336'
      },
      mode: 'dark',
      primary: {
        contrastText: '#ffffff',
        main: '#27AAE1'
      },
      success: {
        contrastText: '#ffffff',
        main: '#4caf50'
      },
      text: {
        primary: '#ffffff',
        secondary: '#ffffff'
      },
      warning: {
        contrastText: '#ffffff',
        main: '#ff9800'
      }
    },
    shadows: darkShadows
  },
  [THEMES.NATURE]: {
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid rgba(145, 158, 171, 0.24)'
          }
        }
      }
    },

    palette: {
      brand: {
        primary0: '#ffffff',
        primary1: '#27AAE1',
        primary2: '#EC008C',
        background0: '#ffffff',
        background1: '#141944',
        background2: '#ededed'
      },
      navbar: {
        default: '#1c2531',
        paper: '#293142'
      },
      background: {
        default: '#1c2531',
        paper: '#293142'
      },
      divider: 'rgba(145, 158, 171, 0.24)',
      error: {
        contrastText: '#ffffff',
        main: '#f44336'
      },
      mode: 'dark',
      primary: {
        contrastText: '#ffffff',
        main: '#01ab56'
      },
      success: {
        contrastText: '#ffffff',
        main: '#4caf50'
      },
      text: {
        primary: '#ffffff',
        secondary: '#919eab'
      },
      warning: {
        contrastText: '#ffffff',
        main: '#ff9800'
      }
    },
    shadows: darkShadows
  },
  [THEMES.INDEV]: {
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid rgba(145, 158, 171, 0.24)'
          }
        }
      }
    },
    palette: {
      brand: {
        primary0: '#ffffff',
        primary1: '#27AAE1',
        primary2: '#EC008C',
        background0: '#ffffff',
        background1: '#141944',
        background2: '#ededed'
      },
      navbar: {
        default: '#1c2531',
        paper: '#141944'
      },
      background: {
        default: '#141944',
        paper: '#ededed',
        blue: '#27AAE1'
      },
      divider: 'rgba(145, 158, 171, 0.24)',
      error: {
        contrastText: '#ffffff',
        main: '#f44336'
      },
      mode: 'light',
      primary: {
        contrastText: '#ffffff',
        main: '#141944'
      },
      success: {
        contrastText: '#ffffff',
        main: '#4caf50'
      },
      text: {
        primary: '#141944',
        secondary: '#919eab'
      },
      warning: {
        contrastText: '#ffffff',
        main: '#ff9800'
      }
    },
    shadows: darkShadows
  }
};

export const createTheme = (config = {}) => {
  let themeOptions = themesOptions[config.theme];

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    themeOptions = themesOptions[THEMES.LIGHT];
  }

  let theme = createMuiTheme(merge({}, baseOptions, overrideOptions, themeOptions, {
    ...(config.roundedCorners && {
      shape: {
        borderRadius: 16
      }
    })
  }, {
    direction: config.direction
  }));

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
