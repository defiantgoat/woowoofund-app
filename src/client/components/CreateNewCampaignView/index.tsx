import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import WooWooTextField from '../../lib/WooWooTextField';
import { setLoadingData } from '../../actions';
import { APPLICATION_VIEWS } from '../../config';
import { ReduxStateConfigProps } from '../../interfaces';
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
  const [errors, setErrors] = useState('');

  const shouldDisableButton = (): boolean => (
      campaignTitle === '' 
      || campaignSnippet === ''
      || campaignAbout === '' 
      || campaignFundingGoal === ''
      || selectedPitchDeckFile === null
    );

  const loggedIn = useSelector(
    (state: ReduxStateConfigProps) => state.user.logged_in
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
    setErrors('');

    if (loggedIn && token) {
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
        dispatch(setLoadingData(true));
  
        const result = await fetch(campaignsUrl, {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
  
        const {data, errors} = await result.json();
        dispatch(setLoadingData(false));
        if (errors) {
          setErrors(errors[0]);
        }
        if (data) {
          navigate(APPLICATION_VIEWS.ManageCampaignsView.path);
        }
      } 
      catch (e) {
        setErrors(e);
      } 
    }
  };

  return (
    <div data-testid={viewId} className={classes.createNewCampaignView}>
      <Grid
        container
        spacing={3}
        direction="row"
        style={{margin:0, width: '100%'}}
      >
        <Grid
          container
          item
          xs={6}
          spacing={3}
        >
          <Grid item xs={12}>
            <WooWooTextField 
              label='Campaign Title'
              value={campaignTitle}
              required={true}
              onChanged={(value) => setCampaignTitle(value)}
            />
          </Grid>
          <Grid item xs={12}>
            <WooWooTextField 
              label='Snippet'
              value={campaignSnippet}
              required={true}
              multiline={true}
              onChanged={(value) => setCampaignSnippet(value)}
            />
          </Grid>
          <Grid item xs={12}>
            <WooWooTextField 
              label='About'
              value={campaignAbout}
              required={true}
              multiline={true}
              onChanged={(value) => setCampaignAbout(value)}
            />
          </Grid>
          <Grid item xs={12}>
            <WooWooTextField 
              label='Funding Goal'
              value={campaignFundingGoal}
              required={true}
              onChanged={(value) => setCampaignFundingGoal(value)}
            />
          </Grid>
          {/* <Grid item xs={12}>
            Thumbnail (Functionality Not Available with POC)
            <input
              type='file'
              disabled
            />
          </Grid> */}
          <Grid container item xs={12} spacing={0}>
            <Grid container item xs={12} spacing={3} style={{margin:0, border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius:'5px'}}>
              <Grid item xs={5}>
                <label>Pitch Deck</label>
                <p><small>(PDF) [4:3, 16:9 or 16:10 ratios for best results]</small></p>
              </Grid>
              <Grid item xs={7}>
                <input
                  type='file'
                  accept='.pdf'
                  onChange={handlePitchDeckSelection}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={submitCampaign}
              variant='outlined'
              disabled={shouldDisableButton()}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          {errors > '' && <div>{errors}</div>}
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateNewCampaignView;
