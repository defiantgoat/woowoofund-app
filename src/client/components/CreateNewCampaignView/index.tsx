import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import WooWooTextField from '../../lib/WooWooTextField';
import { setLoadingData, setActiveTool } from '../../actions';
import { DEFAULT_OVERLAY_MESSAGE } from '../../constants';
import { APPLICATION_VIEWS, DEFAULT_APPLICATION_PATH, getToolIdFromPath } from '../../config';
import { ReduxStateConfigProps, UIValuesProps } from '../../interfaces';
import useStyles from './use-styles';


interface CreateNewCampaignViewProps {
  path?: string | null;
}

const viewId = 'user-dashboard-view';

const CreateNewCampaignView: React.FC<CreateNewCampaignViewProps> = ({path}: CreateNewCampaignViewProps) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [campaignTitle, setCampaignTitle] = useState('');
  const [campaignSnippet, setCampaignSnippet] = useState('');
  const [campaignAbout, setCampaignAbout] = useState('');
  const [campaignFundingGoal, setCampaignFundingGoal] = useState('');
  // const [selectedThumbnailFile, setSelectedThumbnailFile] = useState(null as File | null);
  const [selectedPitchDeckFile, setSelectedPitchDeckFile] = useState(null as File | null);

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

  const handlePitchDeckSelection = ({target}) => {
    setSelectedPitchDeckFile(target.files[0]);
  };

  const submitCampaign = async (): Promise<void> => {
    const campaignsUrl = `${env.pitch_endpoint}/new`;
    const formData = new FormData();

    formData.append('name', campaignTitle);
    formData.append('snippet', campaignSnippet);
    formData.append('about', campaignAbout);
    formData.append('goal_value', campaignFundingGoal);
    if (selectedPitchDeckFile) {
      formData.append('pitch_deck', selectedPitchDeckFile);
    }

    try {
      const result = await fetch(campaignsUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const json = await result.json();
      console.log(json);

    } catch (e) {
      console.log(e);
    }

  };

  return (
    <div data-testid={viewId} className={classes.createNewCampaignView}>
      <Grid
        container
        spacing={3}
        direction="column"
        style={{paddingTop: '8px'}}
      >
        <Grid item xs={6}>
          <WooWooTextField 
            label='Campaign Title'
            value={campaignTitle}
            onChanged={(value) => setCampaignTitle(value)}
          />
        </Grid>
        <Grid item xs={6}>
          <WooWooTextField 
            label='Snippet'
            value={campaignSnippet}
            multiline={true}
            onChanged={(value) => setCampaignSnippet(value)}
          />
        </Grid>
        <Grid item xs={6}>
          <WooWooTextField 
            label='About'
            value={campaignAbout}
            multiline={true}
            onChanged={(value) => setCampaignAbout(value)}
          />
        </Grid>
        <Grid item xs={6}>
          <WooWooTextField 
            label='Funding Goal'
            value={campaignFundingGoal}
            onChanged={(value) => setCampaignFundingGoal(value)}
          />
        </Grid>
        {/* <Grid item xs={6}>
          Thumbnail (Functionality Not Available with POC)
          <input
            type='file'
            disabled
          />
        </Grid> */}
        <Grid item xs={6}>Pitch Deck (pdf)
          <input
            type='file'
            accept='.pdf'
            onChange={handlePitchDeckSelection}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={submitCampaign}
          >Submit</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateNewCampaignView;
