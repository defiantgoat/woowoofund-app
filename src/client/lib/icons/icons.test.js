import React from "react";
import { render } from "@testing-library/react";
import WooWooIcon from './WooWooIcon';

describe('icons', () => {
  const iconProps = {
    foregroundRGB: [255, 255, 255],
    backgroundRGB: [0, 0, 0]
  };

  it('WooWooIcon', () => {
    const propsWithClassName = {
      ...iconProps,
      className: 'mock-class'
    }
    const {container} = render(<WooWooIcon {...propsWithClassName} />);
    expect(container).not.toBeUndefined();
    
    const [svg] = [...container.getElementsByTagName('svg')];
    const svgClassList = [...svg.classList];
    expect(svgClassList.includes('mock-class')).toBeTruthy();
  });

});