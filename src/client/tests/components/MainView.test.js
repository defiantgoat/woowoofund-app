import React from "react";
import { Provider } from "react-redux"
import { navigate } from '@reach/router';
import { render, act, cleanup } from "@testing-library/react";
import { mockUserManager, mockStore, mockStoreInitialState, mockAppDataPayload, mockStoreEnv, mockStoreUser } from "../test-helpers";
import MainView from "../../components/MainView";

jest.mock("oidc-client/lib/oidc-client", () => ({
  UserManager: jest.fn(() => mockUserManager),
}));

navigate = jest.fn();

// jest.mock(
//   '../../components/Dashboard', 
//   () => () => (<div data-testid='mock-dashboard-view'>Dashboard</div>)
// );

global.fetch = jest.fn();

describe("<MainView />", () => {

  afterEach(cleanup);

  it("renders MainView with empty store", ()=> {
    const { container, getByTestId } = render(<Provider store={mockStore}><MainView /></Provider>);
    
    expect(container).not.toBeNull();
    expect(container).not.toBeUndefined();

    const overlay = getByTestId("loading-data-overlay");
    const overlayStyle = overlay.getAttribute("style");

    expect(/(visibility: hidden)/.test(overlayStyle)).toEqual(true);
    expect(/(opacity: 0)/.test(overlayStyle)).toEqual(true);

    expect(getByTestId("main-view")).not.toBeUndefined();
  });

  it("renders MainView when logged in", async ()=> {
    global.fetch = jest.fn((url) => {
      if (new RegExp("^" + mockStoreEnv.metadata_endpoint , "g").test(url)) {
        return new Promise((resolve) => {
          resolve({
            ok: true, 
            json: ()=> (mockAppDataPayload)
            });
          });
      }
    });
    
    const testStoreState = {
      ...mockStoreInitialState,
      user: mockStoreUser,
      env: mockStoreEnv
    };

    const testStore = {
      ...mockStore,
      getState: jest.fn(() => (testStoreState))
    };

    let component = null;

    await act(async ()=> {
      component = await render(<Provider store={testStore}><MainView /></Provider>);
    });

    expect(component).not.toBeNull();

    const {container, getByTestId} = component;

    expect(container).not.toBeNull();
    expect(container).not.toBeUndefined();
  
    const overlay = getByTestId("loading-data-overlay");
    const overlayStyle = overlay.getAttribute("style");
  
    expect(/(visibility: hidden)/.test(overlayStyle)).toEqual(true);
    expect(/(opacity: 0)/.test(overlayStyle)).toEqual(true);
  
    const mainView = getByTestId("main-view");
    expect(mainView).not.toBeUndefined();

    expect(navigate).toHaveBeenCalledWith('dashboard')
  });

});
