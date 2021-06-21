import { ENVIRONMENT_TYPES } from '../constants';
import { EnvironmentProps } from '../interfaces';
import { getEnvironmentConfig } from '../config';

const localhostRegEx = /(localhost)/;

export const isPOC = (url: string): boolean => localhostRegEx.test(url);

export const getEnvironment = (url: string): EnvironmentProps => {
  if (isPOC(url)) {
    return getEnvironmentConfig(ENVIRONMENT_TYPES.POC); 
  }

  return getEnvironmentConfig(ENVIRONMENT_TYPES.POC);
};
