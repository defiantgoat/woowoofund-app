import React from 'react';
import Tabs, { TabsProps } from '@material-ui/core/Tabs';
import useStyles from './use-styles';


const WooWooTabs: React.FC<TabsProps> = (props: TabsProps) => {
  const classes = useStyles();

  return (
    <Tabs
      classes={{
        root: classes.root,
        indicator: 'indicator'
       }}
      {...props}
      TabIndicatorProps={{ children: <span data-test='jayson' /> }}
    />
  );
};

export default WooWooTabs;

