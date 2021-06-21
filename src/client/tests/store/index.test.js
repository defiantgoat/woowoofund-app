import React from "react";
import { Provider } from "react-redux"
import { render, cleanup } from "@testing-library/react";
import App from "../../components/App";
import store from "../../store";

describe("Creates app with initial store", () => {

  afterEach(cleanup);

  it("renders App with empty store", ()=> {
    const { container } = render(<Provider store={store}><App /></Provider>);
    
    expect(container).not.toBeNull();
    expect(container).not.toBeUndefined();
  });

});
