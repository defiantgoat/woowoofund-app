import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, navigate } from '@reach/router';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { setLoadingData, updateCampaigns } from '../../actions';
import { DEFAULT_OVERLAY_MESSAGE } from '../../constants';
import { APPLICATION_VIEWS, DEFAULT_APPLICATION_PATH, getToolIdFromPath } from '../../config';
import { ReduxStateConfigProps, UIValuesProps } from '../../interfaces';
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
          <Card key={`card-${id}`} className={classes.campaignCard} variant="outlined">
            <CardActionArea
              onClick={() => navigate(`view?campaign=${id}`)}
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
        console.log(data);
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
      {
        currentCampaigns
      }
    </div>
  );
};

export default ManageCampaignsView;
