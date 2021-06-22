import React from 'react';
import WooWooIcon, {WooWooIconProps} from './WooWooIcon';

const WooWooSmileyIcon: React.FC<WooWooIconProps> = (props: WooWooIconProps) => {
  return (
    <WooWooIcon {...props}>
			<>
      <g>
        <path d="M6.02,7.03h0.43l0.91,2.22l0.91-2.22h0.43L7.64,9.61l1.28,2.98l2.34-5.6h0.48L9.13,13.1h-0.4L7.38,9.96L6.02,13.1h-0.4
          L3.01,6.99h0.47l2.35,5.6L7.1,9.61L6.02,7.03z" style={{fill: `rgb(${props.foregroundRGB})`}}/>
        <path d="M14.84,7.02h0.73l0.81,2.13l0.82-2.13h0.73l-1.06,2.66l1.05,2.52l2.07-5.22h0.84l-2.56,6.12H17.6l-1.21-2.89l-1.22,2.89
          h-0.67l-2.55-6.12h0.84l2.08,5.22l1.04-2.52L14.84,7.02z" style={{fill: `rgb(${props.foregroundRGB})`}}/>
      </g>
      <g>
        <path d="M11.61,17.01c-2.48,0-5.16-0.63-7.92-2.28c-0.06-0.04-0.11-0.06-0.15-0.09C3.22,14.57,3,14.28,3,13.95
          c0-0.26,0.15-0.5,0.37-0.62c0.38-0.21,0.69-0.03,1.05,0.18c6.12,3.64,11.8,1.78,15.5-0.42c0.34-0.2,0.78-0.09,0.98,0.25
          c0.2,0.34,0.09,0.78-0.25,0.98C18.28,15.73,15.15,17.01,11.61,17.01z" style={{fill: `rgb(${props.foregroundRGB})`}}/>
      </g>
			</>
    </WooWooIcon>
  );
};

export default WooWooSmileyIcon;
