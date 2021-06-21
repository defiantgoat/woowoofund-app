import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: palette.warm.navigate.hex,
    },
    secondary: {
      main: palette.warm.everglades.hex
    }
  },
});

export default theme;
