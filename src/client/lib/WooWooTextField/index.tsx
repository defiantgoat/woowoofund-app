import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

interface WooWooTextFieldConfig {
  label: string;
  value?: string | number;
  onChanged: (string) => void;
  multiline?: boolean;
  disabled?: boolean;
  test_id?: string;
  required?: boolean;
}

const WooWooTextField: React.FC<WooWooTextFieldConfig> = (
  { label, onChanged, value = '', multiline = false, disabled = false, test_id = '', required = false }: WooWooTextFieldConfig
) => {

  const [activeValue, setActiveValue] = useState(value);

  useEffect(()=> {
    setActiveValue(value);
  },[value]);

  return (    
    <TextField 
      id="outlined-basic"
      required={required}
      label={label}
      multiline={multiline}
      disabled={disabled}
      variant="outlined"
      value={activeValue}
      style={{width:'100%'}}
      data-testid={ test_id }
      onChange={(event: React.ChangeEvent<{ value: unknown }>): void => {
        setActiveValue(event.target.value as string);
        onChanged(event.target.value as string);
      }}
    />        
  );
};

export default WooWooTextField;
