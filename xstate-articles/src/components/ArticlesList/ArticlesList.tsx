import { useNavigate } from 'react-router';
import { ArticlesMachineContext } from '../../context/AppContext';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import Button from '../Button/Button';
import Container from '../Container/Container';
import styles from './ArticlesList.module.scss';


export const ArticlesList = () => {
  const navigate = useNavigate();
  const state = ArticlesMachineContext.useSelector((state) => state);

  return (
    <Container width='lg'>
      <h1>Articles</h1>
      <Button color='info' onClick={() => navigate('/addArticle')}>New Article</Button>
      <div className={styles.articleList}>
        {state.context.articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </Container>
  );
};
