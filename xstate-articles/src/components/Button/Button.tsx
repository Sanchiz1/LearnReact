import { ReactNode } from 'react';
import styles from './Button.module.scss';

type Props = {
  onClick?: () => void,
  color?:
  | 'info'
  | 'danger'
  | 'success'
  | 'warning',
  type?:
  | 'button'
  | 'reset'
  | 'submit',
  children?: ReactNode,
  disabled?: boolean
}

function Button({ onClick, color, type, children, disabled }: Props) {
  return (
    <button type={type} className={styles[color!]} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;