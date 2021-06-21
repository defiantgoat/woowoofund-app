import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-material-ui-carousel'
import { APPLICATION_VIEWS, DEFAULT_APPLICATION_PATH, getToolIdFromPath } from '../../config';
import { ReduxStateConfigProps } from '../../interfaces';
import Grid from '@material-ui/core/Grid';
import {getQueryParams} from '../../helpers/url-paths';
import useStyles from './use-styles';

interface CampaignViewProps {
  path: string;
}

interface PitchDeckItem {
  width: number;
  height: number;
  url: string;
}

const viewId = 'campaign-view';

const createPitchDeck = (pitch_deck: Array<PitchDeckItem>): Array<JSX.Element> => {
  return pitch_deck.map((item, i) => {
    const {width, height, url} = item;
    return (<img src={url} key={i} style={{width: `${width}px`, height: `${height}px`}} />);
  });
};

const CampaignView: React.FC<CampaignViewProps> = ({path}: CampaignViewProps) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const windowLocation = window.location.toString();

  const [campaignData, setCampaignData] = useState(null as Record<string,any> | null);

  const loggedIn = useSelector(
    (state: ReduxStateConfigProps) => state.user.logged_in
  );

  const campaigns = useSelector(
    (state: ReduxStateConfigProps) => state.campaigns
  );

  useEffect(() => {
    const {campaign} = getQueryParams(windowLocation);
    if (campaign) {
      const data = campaigns[campaign as string] || null;
      setCampaignData(data);
    }
  }, [windowLocation, campaigns]);

  return (
    <div data-testid={viewId} className={classes.campaignView}>
      {
      campaignData &&
        <>
          <h2 className={classes.campaignName}>{campaignData['name']}</h2>
          <Grid container spacing={6} style={{margin: 0}}>
            <Grid item container xs={9}>
              <Grid item xs={12}><h3>Pitch</h3></Grid>
              <Grid item xs={12}>
                <Carousel
                  autoPlay={false}
                >
                  {
                    createPitchDeck(campaignData['pitch_deck'] || [])
                  }
                </Carousel>
              </Grid>
              <Grid item xs={12}><h3>About</h3></Grid>
              <Grid item xs={12}>{campaignData['about']}</Grid>
            </Grid>
            <Grid item container xs={3}>
              <Grid item xs={12}>
                <h3>Funding Goal</h3>
              </Grid>
              <Grid item xs={12}>
                {`$${campaignData['goal_value']}`}
               </Grid>
               <Grid item xs={12}>
                <h3>Current Funding</h3>
              </Grid>
              <Grid item xs={12}>
                {`$${campaignData['current_value']}`}
               </Grid>
            </Grid>
          </Grid>
          {/* <div style={{display:'flex', flexDirection: 'row'}}>
            <div style={{flexGrow: 1, backgroundColor: 'blue'}}>
              side 1
            </div>
            <div style={{flexBasis: '20%', backgroundColor: 'yellow'}}>
              side 2
            </div>
          </div> */}
        </>
      }
    </div>
  );
};

export default CampaignView;
