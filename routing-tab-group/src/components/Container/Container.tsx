import { PropsWithChildren } from 'react';
import styles from './Container.module.scss';

type Props = PropsWithChildren<{
  width?: 'sm' | 'md' | 'lg',
}>

const Container = ({ width = 'sm', children }: Props) => {
  return (
    <div className={`${styles.container} ${styles['container-' + width]}`}>
      {children}
    </div>
  );
};

export default Container;
