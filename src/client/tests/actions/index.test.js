import * as actions from '../../actions';
import * as types from '../../constants'; 

describe('actions', ()=> {

  it('should add a user', () => {
    const payload = {
      oidc: 'mock-user',
      decoded_token: 'mock-token'
    };

    const expectedAction = {
      type: types.ACTION_ADD_USER,
      payload
    };

    expect(actions.addUser(payload)).toEqual(expectedAction);
  });

  it('should set loading data boolean', ()=> {
    const payload = true;

    const expectedAction = {
      type: types.ACTION_SET_LOADING_DATA,
      payload
    };

    expect(actions.setLoadingData(payload)).toEqual(expectedAction);
  });

  it('should set the environment', ()=> {
    const payload = {
      type: 'poc',
      api_url: 'http://woowoo/api',
      pitch_endpoint: 'http://woowoo/api/endpoint',
    };

    const expectedAction = {
      type: types.ACTION_SET_ENVIRONMENT,
      payload
    };
    
    expect(actions.setEnvironment(payload)).toEqual(expectedAction);
  });

  it('should set the active tool', ()=> {
    const payload = 'some-tool-id';

    const expectedAction = {
      type: types.ACTION_SET_ACTIVE_TOOL,
      payload
    };

    expect(actions.setActiveTool(payload)).toEqual(expectedAction);
  });

});
