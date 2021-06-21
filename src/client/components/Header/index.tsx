import React from 'react';
import UserButton from '../UserButton';
import useStyles from './use-styles';

const Header: React.FC = () =>  {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <h1 className={classes.appName}><span>Woo</span><span>Woo</span><span>Fund</span></h1>
      <div className={classes.appButtonsContainer}></div>
      <div className={classes.userButtonContainer}>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
