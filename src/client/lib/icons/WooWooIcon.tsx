import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

export interface WooWooIconProps extends SvgIconProps {
  backgroundRGB: Array<number>;
  foregroundRGB: Array<number>;
  children?: JSX.Element;
}

const WooWooIcon: React.FC<WooWooIconProps> = (props: WooWooIconProps) => {
  return (
    <SvgIcon className={props.className || ''}>
			<g>
        <circle cx="12" cy="12" r="12" style={{fill: `rgb(${props.backgroundRGB})`}}/>
        {props.children}
		  </g>
    </SvgIcon>
  );
};

export default WooWooIcon;
