import React from 'react';
import { navigate } from '@reach/router';
import { ButtonBase } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTool } from '../../actions';
import { ReduxStateConfigProps } from '../../interfaces';
import WooWooIcon from '../../lib/icons/WooWooIcon';

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
    dispatch(setActiveTool('manage'));
    navigate('manage');
  };

  return (
    <div className={classes.userButton}>
      <div className={classes.userIcon}>
        <WooWooIcon backgroundRGB={[255, 255, 255]} foregroundRGB={[10,10,10]} />
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
