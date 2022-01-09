import * as React from 'react';

interface IInputProps {
  register?: any;
  name: string;
}

export function Input({ register, name, ...rest }: IInputProps) {
  return <input name={name} ref={register} {...rest} />;
}