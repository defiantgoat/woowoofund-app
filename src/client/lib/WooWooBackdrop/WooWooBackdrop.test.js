import React from "react";
import { render, cleanup } from "@testing-library/react";
import WooWooBackdrop from ".";

describe("WooWooBackdrop tests", () => {
  afterEach(cleanup);

  it("renders backdrop with default values", ()=> {
    const { container } = render(<WooWooBackdrop />);
    
    expect(container).not.toBeNull();
    expect(container).not.toBeUndefined();

    const [parentDiv] = container.getElementsByTagName('DIV');
    expect(parentDiv.getAttribute('data-testid')).toEqual('');
    expect(parentDiv.style.visibility).toEqual('hidden');

    const [h2] = parentDiv.getElementsByTagName('H2');
    expect(h2.innerHTML).toEqual('');
  });

  it("renders backdrop with all props correctly", ()=> {    
    const { container, getByText, getByTestId } = render(
      <WooWooBackdrop 
        message='Mock Message'
        visible={true}
        test_id='backdrop'
      />
    );
        
    expect(container).not.toBeNull();
    expect(container).not.toBeUndefined();

    const [parentDiv] = container.getElementsByTagName('DIV');
    expect(parentDiv.style.opacity).toEqual('1');

    expect(getByText('Mock Message')).not.toBeUndefined();
    expect(getByTestId('backdrop')).not.toBeUndefined();
  });

});