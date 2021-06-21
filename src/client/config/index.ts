import { ENVIRONMENT_TYPES } from '../constants';
import { EnvironmentProps } from '../interfaces';
import CampaignView from '../components/CampaignView';
import ManageCampaignsView from '../components/ManageCampaignsView';
import CreateNewCampaignView from '../components/CreateNewCampaignView';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessCenterOutlinedIcon from '@material-ui/icons/BusinessCenterOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


export const SERVER_URL_NAMESPACE = 'app';

export const VERSION = '0.1.0';

export const API_URLS: Record<string, string> = {
  [ENVIRONMENT_TYPES.POC]: 'http://localhost:9292',
};

export const APPLICATION_VIEWS = {
  'ManageCampaignsView': {
    component: ManageCampaignsView,
    displayName: 'Your Campaigns',
    enabled: true,
    icon: (): any => BusinessCenterOutlinedIcon,
    path: 'manage',
    toolId: 'manage',
    showInMenu: true,
    tabValue: 0
  },
  'CreateNewCampaignView': {
    component: CreateNewCampaignView,
    displayName: 'New Campaign',
    enabled: true,
    icon: (): any => AddCircleOutlineIcon,
    path: 'create',
    toolId: 'create',
    showInMenu: true,
    tabValue: 1
  },
  'CampaignView': {
    component: CampaignView,
    displayName: 'View Campaign',
    enabled: true,
    icon: (): any => DashboardIcon,
    path: 'view',
    toolId: 'view',
    showInMenu: false,
    tabValue: 2
  }
};

export const DEFAULT_APPLICATION_PATH = APPLICATION_VIEWS.ManageCampaignsView.path;

export const getEnvironmentConfig = (env: string): EnvironmentProps => {
  const api_url = API_URLS[env];

  return {
    type: env,
    api_url,
    pitch_endpoint: `${api_url}/api/pitch`,
  };
};

export const getToolIdFromPath = (path: string): string => {
  let toolId = '';
  for (const tool in APPLICATION_VIEWS) {
    const rx = new RegExp('(' + APPLICATION_VIEWS[tool].path + ')', 'g');
    if (rx.test(path)) {
      toolId = APPLICATION_VIEWS[tool].toolId;
      break;
    }
  }
  return toolId;
};
