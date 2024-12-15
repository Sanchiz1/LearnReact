import React from 'react';
import withErrorDisplay from '../../helpers/withErrorDisplay';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error: string | null;
}

const Input = withErrorDisplay(({ ...props }: InputProps) => {
  return (
    <input
      {...props}
    />
  );
});

export default Input;
