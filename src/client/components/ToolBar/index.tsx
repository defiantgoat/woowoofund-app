import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';
import WooWooTabs from '../../lib/WooWooTabs';
import WooWooTab from '../../lib/WooWooTab';
import { ReduxStateConfigProps } from '../../interfaces';
import { APPLICATION_VIEWS } from '../../config';
import useStyles from './use-styles';
import { setActiveTool } from '../../actions';


const ToolBar: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const activeTool = useSelector((state: ReduxStateConfigProps) => state.active_tool);

  const [toolMenu, setToolMenu] = useState([] as Array<JSX.Element>);
  const [currentTabValue, setCurrentTabValue] = useState(0);

  useEffect(() => {
    const items: JSX.Element[] = [];
    for (const tool in APPLICATION_VIEWS) {
      const { displayName, toolId, icon, path, showInMenu, tabValue } = APPLICATION_VIEWS[tool];
        if (showInMenu) {
          items.push(
            <WooWooTab
              key={`tab-${toolId}`}
              selected={ toolId === activeTool }
              icon={ icon().type.render() }
              label={ displayName }
              onClick={(): void => {
                dispatch(setActiveTool(toolId));
                setCurrentTabValue(tabValue);
                navigate(path);
              }}
            />
          );
        }
      }

    setToolMenu(items);

  }, [APPLICATION_VIEWS, activeTool]);

  return (
    <div className={classes.toolBar}>
      <WooWooTabs value={currentTabValue}>
        { toolMenu }
      </WooWooTabs>
    </div>
  );
};

export default ToolBar;
