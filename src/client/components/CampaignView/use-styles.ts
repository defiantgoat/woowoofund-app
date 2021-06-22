import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  campaignView: {
    width: '100%',
    '& h3': {
      fontSize: '1.4em',
      fontFamily: 'Raleway, sans-serif',
      fontWeight: 500,
      marginBottom: '16px'
    }
  },
  campaignName: {
    fontSize: '2.3em',
    fontWeight: 100,
    marginBottom: '16px',
    fontFamily: 'Raleway, sans-serif'
  },
  highlightPanel: {
    backgroundColor: '#F6F9FD',
    borderRadius: '8px',
    marginBottom: '16px',
    padding: '16px'
  }

}));

export default useStyles;
