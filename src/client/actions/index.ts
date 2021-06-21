import {
  ACTION_ADD_USER,
  ACTION_SET_LOADING_DATA,
  ACTION_SET_ENVIRONMENT,
  ACTION_SET_ACTIVE_TOOL,
  ACTION_UPDATE_CAMPAIGNS
} from '../constants';
import { ReduxActionProps } from '../interfaces';

export const addUser = (payload: any): ReduxActionProps => {
  return { type: ACTION_ADD_USER, payload };
};

export const setLoadingData = (payload: any): ReduxActionProps => {
  return { type: ACTION_SET_LOADING_DATA, payload };
};

export const setEnvironment = (payload: any): ReduxActionProps => {
  return { type: ACTION_SET_ENVIRONMENT, payload };
};

export const setActiveTool = (payload: any): ReduxActionProps => {
  return { type: ACTION_SET_ACTIVE_TOOL, payload};
};

export const updateCampaigns = (payload: any): ReduxActionProps => {
  return { type: ACTION_UPDATE_CAMPAIGNS, payload};
};
