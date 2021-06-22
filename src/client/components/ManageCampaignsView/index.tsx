import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { setActiveTab, setLoadingData, updateCampaigns } from '../../actions';
import { ReduxStateConfigProps } from '../../interfaces';
import useStyles from './use-styles';


interface ManageCampaignsViewProps {
  path?: string | null;
}

const viewId = 'user-dashboard-view';

const ManageCampaignsView: React.FC<ManageCampaignsViewProps> = ({path}: ManageCampaignsViewProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [currentCampaigns, setCurrentCampaigns] = useState([] as Array<JSX.Element>);

  const loggedIn = useSelector(
    (state: ReduxStateConfigProps) => state.user.logged_in
  );

  const campaigns = useSelector(
    (state: ReduxStateConfigProps) => state.campaigns
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
    const items: JSX.Element[] = [];

    for (const campaign in campaigns) {
        const {id, name, snippet, thumbnail} = campaigns[campaign];

        items.push(
          <Grid item xs={3} key={`card-${id}`}>
            <Card variant="outlined">
              <CardActionArea
                onClick={() => {
                  dispatch(setActiveTab(2));
                  navigate(`view?campaign=${id}`);
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={thumbnail}
                />
                <CardContent>
                  <div className={classes.campaignName}>{name}</div>
                  <div className={classes.campaignAbout}>{snippet}</div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      }

      setCurrentCampaigns(items);

  }, [campaigns]);

  useEffect(() => {
    if (loggedIn) {
      const fetchCampaigns = async(): Promise<void> => {
        const campaignsUrl = `${env.pitch_endpoint}/all?token=${token}`;
        dispatch(setLoadingData(true));

        const campaignData = await fetch(campaignsUrl);
        const {data, errors} = await campaignData.json();
        const campaignsObject = {};
        if (data) {        
          data.forEach((campaign) => campaignsObject[campaign['id']] = campaign);
        }
        
        dispatch(updateCampaigns(campaignsObject));
        dispatch(setLoadingData(false));
      };

      fetchCampaigns();
    }
  }, [loggedIn, token, env]);

  return (
    <div data-testid={viewId} className={classes.manageCampaignsView}>
      <Grid container
        spacing={3}
        direction="row"
        style={{margin:0}}
      >
        {
          
          currentCampaigns
        }
      </Grid>
    </div>
  );
};

export default ManageCampaignsView;
