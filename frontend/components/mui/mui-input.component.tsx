import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { useStyles } from './use-styles.hook';

interface IMUIInputProps {
  helper?: string;
  label: string
}

export const MUIInput: React.FC<IMUIInputProps> = ({
  helper,
  label
}) => {

  const describedBy = helper ? `${label}-helper-text` : undefined;
  
  const classes = useStyles();

  return (
    <FormControl fullWidth className={classes.root}>
      <InputLabel 
        htmlFor={label}
        className={classes.input}
      >
        {label}
      </InputLabel>
      <Input
        id={label.toLowerCase().includes('e-mail') ? 'email' : label}
        className={classes.input}
        aria-describedby={describedBy}
      />
      {helper && <FormHelperText 
        id={`${label}-helper-text`}
        className={classes.helper}
      >
        Some important helper text
      </FormHelperText>}
    </FormControl>
  );
}
