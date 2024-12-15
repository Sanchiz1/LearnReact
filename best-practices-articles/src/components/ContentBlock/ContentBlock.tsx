import Content from "../../types/Content";
import styles from './ContentBlock.module.scss';

type Props = {
  content: Content;
}

const ContentBlock = ({ content }: Props) => {
  return (
    <div className={styles.contentBlock}>
      <h1>{content.title}</h1>
      <span>{content.text}</span>
    </div>
  );
}

export default ContentBlock;