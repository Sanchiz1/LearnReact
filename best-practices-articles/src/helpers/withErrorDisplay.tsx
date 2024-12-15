import React from 'react';
import ErrorText from '../components/ErrorText/ErrorText';

interface WithErrorDisplayProps {
  error: string | null;
}

const withErrorDisplay = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const WithErrorDisplay: React.FC<P & WithErrorDisplayProps> = ({
    error,
    ...props
  }) => (
    <>
      <WrappedComponent {...(props as P)} />
      {error && <ErrorText error={error} />}
    </>
  );

  return WithErrorDisplay;
};

export default withErrorDisplay;
