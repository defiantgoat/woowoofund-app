import { DEFAULT_APPLICATION_PATH, SERVER_URL_NAMESPACE } from '../config';

export const getQueryParams = (url: string): Record<string, unknown> => {
  const queryStringParamsRegEx = /\?(?<query>(.+))$/;
  const params = queryStringParamsRegEx.exec(url);
  const outParams = {};
  
  if (!params) {
    return outParams;
  }

  // No need to test else path, as if there is no query string or groups isn't supported then {} is returned.
  /* istanbul ignore else */
  if (params && params.groups && params.groups.query) {
    const { query } = params.groups;
    query.split('&').forEach((pair) => {
      const [key, value] = pair.split('=');
      outParams[key] = value;
    });
  }
  return outParams;
};

export const captureInitialRequestPath = (url: string): string => {
  const pathRegex = new RegExp('(' + SERVER_URL_NAMESPACE + '\\/(?<route>(.+))?)$', '');
  const path = url.match(pathRegex);

  if (path && path.groups && path.groups['route']) {
    return path.groups['route'];
  }

  return DEFAULT_APPLICATION_PATH;
};
