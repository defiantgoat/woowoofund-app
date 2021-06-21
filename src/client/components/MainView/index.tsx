import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, navigate } from '@reach/router';
import WooWooBackdrop from '../../lib/WooWooBackdrop';
import ToolBar from '../ToolBar';
import { setLoadingData, setActiveTool } from '../../actions';
import { DEFAULT_OVERLAY_MESSAGE } from '../../constants';
import { APPLICATION_VIEWS, SERVER_URL_NAMESPACE, DEFAULT_APPLICATION_PATH, getToolIdFromPath } from '../../config';
import { ReduxStateConfigProps, UIValuesProps } from '../../interfaces';
import useStyles from './use-styles';


interface MainViewProps {
  path?: string | null;
}

const viewId = 'main-view';

const MainView: React.FC<MainViewProps> = ({path}: MainViewProps) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [loadingMessage, setLoadingMessage] = useState(DEFAULT_OVERLAY_MESSAGE);
  const [viewComponents, setViewComponents] = useState([] as JSX.Element[]);

  const loggedIn = useSelector(
    (state: ReduxStateConfigProps) => state.user.logged_in
  );

  const loadingData = useSelector(
    (state: ReduxStateConfigProps) => state.loading_data
  );

  const token = useSelector((state: ReduxStateConfigProps) => {
    const {user} = state;
    // If there is no token, then all requests will fail. No need to test else logic.
    /* istanbul ignore else */
    if (user && user.oidc) {
      return user.oidc.access_token;
    }
  });
  const env = useSelector((state: ReduxStateConfigProps) => state.env);

  useEffect(() => {
    const toPath = path || DEFAULT_APPLICATION_PATH;
    const toolId = getToolIdFromPath(toPath);

    dispatch(setActiveTool(toolId));
    navigate(toPath);

    return (): void => {
      // Do any cleanup if needed.
      return;
    };
  }, [loggedIn, token, env]);

  useEffect(() => {
    const items: JSX.Element[] = [];

    for (const tool in APPLICATION_VIEWS) {
      const { component, path } = APPLICATION_VIEWS[tool];
      items.push(
        React.createElement(component, { path: `${SERVER_URL_NAMESPACE}/${path}`, key: `${path}-route`}, null)         
      );
    }

    setViewComponents(items);

  }, [APPLICATION_VIEWS]);

  return (
    <div className={classes.mainView} data-testid={viewId}>
      <WooWooBackdrop
        visible={loadingData}
        message={loadingMessage}
        test_id="loading-data-overlay"
      />
      <ToolBar />
      <Router style={{flexGrow: 1, padding: '16px'}}>
        {
          viewComponents
        }
      </Router>
    </div>
  );
};

export default MainView;
