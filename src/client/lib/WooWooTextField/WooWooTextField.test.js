import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import WooWooTextField from ".";

const mockFunction = jest.fn();

const mockProps = {
  label: "Mock TextField",
  onChanged: mockFunction
};

describe("WooWooTextField", ()=> {

  afterEach(cleanup);

  it("renders WooWooTextField with required props", ()=> {
    const { container, getAllByText} = render(<WooWooTextField {...mockProps} />);

    expect(container).not.toBeUndefined();
  
    const label = getAllByText("Mock TextField");
    expect(label.length).toBeGreaterThan(0);
    expect(label[0].tagName).toEqual("LABEL");

    const input = container.getElementsByTagName("INPUT");
    expect(input.length).toEqual(1);
    expect(input[0].value).toEqual("");
  });

  it("renders WooWooTextField with all props", ()=> {
    const allProps = {
      ...mockProps,
      value: "Good Times",
      multiline: true,
      disabled: true,
      test_id: "mock-test-id",
      required: true
    };
    
    const { container, getAllByText, getByTestId } = render(<WooWooTextField {...allProps} />);

    expect(container).not.toBeUndefined();
  
    const label = getAllByText("Mock TextField");
    expect(label.length).toBeGreaterThan(0);
    expect(label[0].tagName).toEqual("LABEL");

    const [input] = container.getElementsByTagName("TEXTAREA");
    expect(input).not.toBeUndefined();
    expect(input.value).toEqual("Good Times");
    expect(input.getAttribute("disabled")).not.toBeUndefined();
    expect(input.getAttribute("required")).not.toBeUndefined();

    expect(getByTestId("mock-test-id")).not.toBeUndefined();
  });

  it("triggers a passed onChange event handler", ()=> {
    const { container, getAllByText} = render(<WooWooTextField {...mockProps} />);

    expect(container).not.toBeUndefined();
  
    const label = getAllByText("Mock TextField");
    expect(label.length).toBeGreaterThan(0);
    expect(label[0].tagName).toEqual("LABEL");

    const input = container.getElementsByTagName("INPUT");
    expect(input.length).toEqual(1);
    expect(input[0].value).toEqual("");
    
    fireEvent.change(input[0],{ 
      target: { value: "Bad Times" }
    });

    expect(mockFunction).toHaveBeenCalled();

    expect(input[0].value).toEqual("Bad Times");
  });

});
