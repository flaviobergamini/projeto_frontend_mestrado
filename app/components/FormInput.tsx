'use client';

import { TextField, TextFieldProps } from '@mui/material';

type FormInputProps = Omit<TextFieldProps, 'variant'> & {
  variant?: 'outlined' | 'filled' | 'standard';
};

export default function FormInput({ variant = 'outlined', ...props }: FormInputProps) {
  return (
    <TextField
      variant={variant}
      fullWidth
      margin="normal"
      {...props}
    />
  );
}
