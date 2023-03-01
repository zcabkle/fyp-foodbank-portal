import { createTheme as createMuiTheme } from '@mui/material/styles';
import { baseThemeOptions } from './base-theme-options';
import { lightThemeOptions } from './light-theme-options';

const createTheme = () => {
  let theme = createMuiTheme(baseThemeOptions, lightThemeOptions);
  return theme;
};

export default createTheme
