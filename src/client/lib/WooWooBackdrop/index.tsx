import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';

interface WooWooBackdropProps {
  message: string;
  visible: boolean;
  test_id?: string;
}

const WooWooBackdrop: React.FC<WooWooBackdropProps> = ({message = '', visible = false, test_id = ''}: WooWooBackdropProps) => {
  
  return (
    <Backdrop
      style={{zIndex: 100}}
      open={visible}
      data-testid={ test_id }
    >
      <h2 style={{padding: 16, backgroundColor: 'white', borderRadius: 8}}>{message}</h2>
    </Backdrop>
  );
};

export default WooWooBackdrop;
