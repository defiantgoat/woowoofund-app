import React from "react";
import { Provider } from "react-redux"
import { render, act, cleanup } from "@testing-library/react";
import { mockUserManager, mockStore, mockStoreInitialState, mockAppDataPayload, mockStoreEnv, mockStoreUser } from "../test-helpers";
import App from "../../components/App";

jest.mock(
  '../../components/MainView', 
  () => () => (<div data-testid='mock-main-view'>MainView</div>)
);

jest.mock("oidc-client/lib/oidc-client", () => ({
  UserManager: jest.fn(() => mockUserManager),
}));

global.fetch = jest.fn();

describe("<App />", () => {

  afterEach(cleanup);

  it("renders App with empty store", ()=> {
    const { container, getByTestId } = render(<Provider store={mockStore}><App /></Provider>);
    
    expect(container).not.toBeNull();
    expect(container).not.toBeUndefined();

    const overlay = getByTestId("validating-user-session-overlay");
    const overlayStyle = overlay.getAttribute("style");

    expect(/(visibility: hidden)/.test(overlayStyle)).toEqual(false);
    expect(/(opacity: 0)/.test(overlayStyle)).toEqual(false);

    expect(() => {
      getByTestId("main-view")
    }).toThrowError();
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
      component = await render(<Provider store={testStore}><App /></Provider>);
    });

    expect(component).not.toBeNull();

    const {container, getByTestId} = component;

    expect(container).not.toBeNull();
    expect(container).not.toBeUndefined();
  
    const overlay = getByTestId("validating-user-session-overlay");
    const overlayStyle = overlay.getAttribute("style");
  
    expect(/(visibility: hidden)/.test(overlayStyle)).toEqual(true);
    expect(/(opacity: 0)/.test(overlayStyle)).toEqual(true);
  
    const mainView = getByTestId("mock-main-view");
    expect(mainView).not.toBeUndefined();
  });

});
