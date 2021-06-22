import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainView from '../MainView';
import Header from '../Header';
import { getEnvironment } from '../../helpers/environment';
import { setEnvironment } from '../../actions';
import { ReduxStateConfigProps } from '../../interfaces';
import { captureInitialRequestPath } from '../../helpers/url-paths';
import { ThemeProvider } from '@material-ui/styles';
import useStyles from './use-styles';

const App: React.FC = () =>  {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: ReduxStateConfigProps) => state.user.logged_in);

  useEffect(()=> {
    const env = getEnvironment(window.location.toString());
    dispatch(setEnvironment(env));
  }, []);

  return (
      <div className={classes.app}>
        <Header />
        {
            loggedIn
            ? <MainView path={ captureInitialRequestPath(window.location.toString()) } />
            : <div>Log in Required</div>
          }
      </div>
  );
};

export default App;
