import React, { memo } from 'react';
import { Link } from 'react-router';
import { Article } from '../../behaviour/articles';
import styles from './ArticleCard.module.scss';

type ArticleCardProps = {
  article: Article;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className={styles.articleCard}>
      <h2 className={styles.articleTitle}>
        <Link to={`/article/${article.id}`} className={styles.articleLink}>
          {article.title}
        </Link>
      </h2>
      <p className={styles.articleContent}>
        {article.content.length > 100
          ? `${article.content.substring(0, 100)}...`
          : article.content}
      </p>
      <Link to={`/article/${article.id}`} className={styles.readMore}>
        Read More
      </Link>
    </div>
  );
};

export default memo(ArticleCard)
