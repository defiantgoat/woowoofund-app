import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    textTransform: 'none',
    color: '#9E005D',
    fontFamily: 'Raleway',
    fontWeight: 500,
    fontSize: '1em',
    marginRight: 0,
    '&:focus': {
      opacity: 1,
    },
  }
}));

export default useStyles;
