import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  manageCampaignsView: {
    backgroundColor: 'white',
    height: '100%',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  campaignCard: {
    flexBasis: 'calc(25% - 8px)',
    height: '400px',
    margin: '8px',
    fontFamily: 'Montserrat, sans-serif'
  },
  campaignName: {
    fontFamily: 'Raleway, sans-serif',
    fontSize: '2em'
  },
  campaignAbout: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1em',
    padding: '8px 0'
  }
}));

export default useStyles;
