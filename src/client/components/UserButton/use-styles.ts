import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  userButton: {
    display: 'flex',
    backgroundColor: '#770046'
  },
  userIcon: {
    flexGrow: 0,
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg:nth-child(1)': {
      width: '32px',
      height: '32px'
    },
  },
  userName: {
    border: 'none',
    color: 'white',
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 300,
    paddingRight: '16px',
    paddingLeft: '8px',
    flexGrow: 1,
  }
}));

export default useStyles;
