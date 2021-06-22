import React from 'react';
import { navigate } from '@reach/router';
import { ButtonBase } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab, setActiveTool } from '../../actions';
import { ReduxStateConfigProps } from '../../interfaces';
import { APPLICATION_VIEWS } from '../../config';
import WooWooSmileyIcon from '../../lib/icons/WooWooSmileyIcon';

import useStyles from './use-styles';

const UserButton: React.FC = () =>  {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userName = useSelector((state: ReduxStateConfigProps) => {
    const {user} = state;
    if (user && user.decoded_token) {
      return `${user.decoded_token.user.first_name} ${user.decoded_token.user.last_name}`;
    }
    return '';
  });

  const handleButtonClick = (): void => {
    const {toolId, tabValue, path} = APPLICATION_VIEWS.ManageCampaignsView;
    dispatch(setActiveTool(toolId));
    dispatch(setActiveTab(tabValue));
    navigate(path);
  };

  return (
    <div className={classes.userButton}>
      <div className={classes.userIcon}>
        <WooWooSmileyIcon backgroundRGB={[255, 255, 255]} foregroundRGB={[10,10,10]} />
      </div>
      <ButtonBase
        onClick={handleButtonClick}
      >
        <div className={classes.userName}>
          {userName}
        </div>
      </ButtonBase>

    </div>
  );
};

export default UserButton;
