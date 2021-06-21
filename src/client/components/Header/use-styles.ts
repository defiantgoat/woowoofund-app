import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: '#9E005D',
    display: 'flex',
    height: '50px',
  },
  appName: {
    fontSize: '1.5em',
    color: 'white',
    fontFamily: 'Raleway, sans-serif',
    paddingTop: '9px',
    paddingLeft: '16px',
    paddingRight: '16px',
    flexGrow: 0,
    '& span:nth-child(1)': {
      fontWeight: '300',
    },
    '& span:nth-child(2)': {
      fontWeight: '500',
    },
    '& span:nth-child(3)': {
      fontWeight: '600',
    }
  },
  appButtonsContainer: {
    flexGrow: 1,
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  userButtonContainer: {
    flexGrow: 0
  }
}));

export default useStyles;
