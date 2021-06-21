import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& .indicator': {
      width: '100%',
      backgroundColor: '#9E005D',
    },
  }
}));

export default useStyles;
