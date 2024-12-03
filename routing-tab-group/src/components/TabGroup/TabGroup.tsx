import { ReactNode } from "react";
import styles from './TabGroup.module.scss';

type Props = {
  children?: ReactNode;
}

const TabGroup = ({ children }: Props) => {
  return (
    <div className={styles.tabGroup}>
      {children}
    </div>
  );
};

export default TabGroup;
