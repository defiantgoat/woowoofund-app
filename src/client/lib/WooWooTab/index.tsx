import React from 'react';
import Tab, {TabProps} from '@material-ui/core/Tab';
import useStyles from './use-styles';

const WooWooTab: React.FC<TabProps> = (props: TabProps) => {
  const classes = useStyles();

  return (<Tab className={classes.root} disableRipple {...props} />);
};

export default WooWooTab;
