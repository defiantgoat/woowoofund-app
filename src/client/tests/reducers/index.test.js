import rootReducer, {initialState} from '../../reducers';
import * as constants from '../../constants'; 
import { DEFAULT_APPLICATION_PATH } from '../../config';
import { mockStoreInitialState, mockStoreAppData, mockStoreEnv } from '../test-helpers';

let testState = {
  ...mockStoreInitialState
};

beforeEach(()=> {
  testState = {
    ...mockStoreInitialState
  };
});

describe('reducers', ()=> {

  it('should return the initial state', () => {
    expect(rootReducer(undefined, {type: 'mock', payload: {}})).toEqual(initialState);
  });

  it('should handle ACTION_ADD_USER', ()=> {
    expect(
      rootReducer(testState, {
        type: constants.ACTION_ADD_USER,
        payload: {
          oidc: 'mock-user',
          decoded_token: 'mock-token',
          logged_in: true
        }
      })
    ).toEqual({
      ...initialState,
      user: {
        oidc: 'mock-user',
        decoded_token: 'mock-token',
        logged_in: true
      }
    });
  });

  it('should handle ACTION_SET_LOADING_DATA', ()=> {
    expect(
      rootReducer(testState, {
        type: constants.ACTION_SET_LOADING_DATA,
        payload: true
      })
    ).toEqual({
      ...initialState,
      loading_data: true
    });
  });

  it('should handle ACTION_SET_ENVIRONMENT', ()=> {
    expect(
      rootReducer(testState, {
        type: constants.ACTION_SET_ENVIRONMENT,
        payload: mockStoreEnv
      })
    ).toEqual({
      ...initialState,
      env: mockStoreEnv
    });
  });

  it('should handle ACTION_SET_ACTIVE_TOOL', ()=> {
    expect(
      rootReducer(testState, {
        type: constants.ACTION_SET_ACTIVE_TOOL,
        payload: 'mock-tool'
      })
    ).toEqual({
      ...initialState,
      active_tool: 'mock-tool'
    });
  });


});
