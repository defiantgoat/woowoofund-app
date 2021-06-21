import { initialState } from '../reducers';
import { DEFAULT_APPDATA } from '../config';

class MockOidcEvents {
  constructor() {
    this.eventHandlers = {};
    for (const event of [
      'UserLoaded',
      'UserUnloaded',
      'SilentRenewError',
      'AccessTokenExpired',
      'AccessTokenExpiring',
      'UserSignedOut',
    ]) {
      MockOidcEvents.prototype[`add${event}`] = jest.fn((fn) => (this.eventHandlers[event] = fn));
      MockOidcEvents.prototype[`remove${event}`] = jest.fn(() => delete this.eventHandlers[event]);
    }
  }

  trigger(event, ...args) {
    this.eventHandlers[event](...args);
  }
}

export const mockUserManager = {
  events: new MockOidcEvents(),
  signinRedirectCallback: jest.fn(),
  signinRedirect: jest.fn(),
  signoutRedirect: jest.fn(),
  signinSilent: jest.fn(),
  getUser: jest.fn(),
  settings: {
    userStore: {
      set: async () => Promise.resolve(),
      get: async () => Promise.resolve('mock-value')
    }
  }
};

export const mockStoreInitialState = {
  ...initialState
};

export const mockStoreEnv = {
  type: 'mock-testing',
  hypervision_url: 'http://testing/hs',
  metadata_endpoint: 'http://testing/metadata/all',
  rules_endpoint: 'http://testing/rules'
};

export const mockUsername = 'mock-user@nearmap.com';

export const mockStoreUser = {
  oidc: {
    access_token: 'mock-token',
  },
  decoded_token: {
    family_name: 'Baggins',
    given_name: 'Bilbo'
  },
  logged_in: true,
  isAdmin: false
};

export const mockAppDataPayload = {
  'data': [{
    countries: [
      { id: 1, iso_a2: 'US', name: 'USA' },
      { id: 2, iso_a2: 'AU', name: 'Australia' },
      { id: 3, iso_a2: 'NZ', name: 'New Zealand' },
      { id: 4, iso_a2: 'CA', name: 'Canada' }
    ],
    rules: [
      {
        id: 'rule_1',
        name: 'Rule 1',
        description: 'Rule 1 is a survey region rule.',
        workspace_aware: true
      },
      {
        id: 'rule_2',
        name: 'Rule 2',
        description: 'Rule 2 is a flight map rule.',
        workspace_aware: false
      }
    ],
    workspaces: [
      { id: 1, workspace_name: 'Workspace 1' },
      { id: 2, workspace_name: 'Workspace 2' },
      { id: 3, workspace_name: 'Workspace 3' }
    ]
  }]
};

export const mockStoreAppData = {
  ...DEFAULT_APPDATA,
  countries: {
    data: [
      { id: 1, iso_a2: 'US', name: 'USA' },
      { id: 2, iso_a2: 'AU', name: 'Australia' },
      { id: 3, iso_a2: 'NZ', name: 'New Zealand' },
      { id: 4, iso_a2: 'CA', name: 'Canada' }
    ],
    ui_element_values: [
      { id: 1, label: 'US', value: 'US' },
      { id: 2, label: 'AU', value: 'AU' },
      { id: 3, label: 'NZ', value: 'NZ' },
      { id: 4, label: 'CA', value: 'CA' }
    ]
  },
  rules: {
    data: [
      {
        id: 'rule_1',
        name: 'Rule 1',
        description: 'Rule 1 is a survey region rule.',
        workspace_aware: true
      },
      {
        id: 'rule_2',
        name: 'Rule 2',
        description: 'Rule 2 is a flight map rule.',
        workspace_aware: false
      }
    ],
    ui_element_values: [
      { id: 'rule_1', label: 'Rule 1', value: 'rule_1' },
      { id: 'rule_2', label: 'Rule 2', value: 'rule_2' },
    ]
  },
  workspaces: {
    data: [
      { id: 1, workspace_name: 'Workspace 1' },
      { id: 2, workspace_name: 'Workspace 2' },
      { id: 3, workspace_name: 'Workspace 3' }
    ],
    ui_element_values: [
      { id: -1, label: 'All Workspaces', value: '*' },
      { id: 1, label: 'Workspace 1', value: 1 },
      { id: 2, label: 'Workspace 2', value: 2 },
      { id: 3, label: 'Workspace 3', value: 3 },
    ]
  },
};

export const mockStore = {
  getState: jest.fn(() => (mockStoreInitialState)),
  dispatch: jest.fn(),
  subscribe: jest.fn()
};
