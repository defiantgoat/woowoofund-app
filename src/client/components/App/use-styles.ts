import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  app: {
    display: 'flex',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    flexDirection: 'column'
  }
}));

export default useStyles;
