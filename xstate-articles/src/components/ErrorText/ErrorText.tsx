import styles from './ErrorText.module.scss';

type Props = {
  error: string | null;
};

const ErrorText = ({ error }: Props) => {
  return (
    <>{error && <p className={styles.error}>{error}</p>}</>
  );
};

export default ErrorText;
