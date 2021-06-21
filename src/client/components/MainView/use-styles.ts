import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  mainView: {
    flexGrow: 1,
    display: 'flex',
    overflowY: 'scroll',
    flexDirection: 'column'
  }
}));

export default useStyles;
