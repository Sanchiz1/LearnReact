import { Suspense, lazy, useState } from 'react';
import { useNavigate } from 'react-router';
import { useGetArticlesQuery } from '../../behaviour/articles/service';
import Button from '../Button/Button';
import Container from '../Container/Container';
import styles from './ArticlesListPage.module.scss';

const ArticleCard = lazy(() => import('../ArticleCard/ArticleCard'));

export const ArticlesListPage = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetArticlesQuery(page);
  const navigate = useNavigate();

  const handleNextPage = () => {
    if (!data) return;
    if (data.page < data.totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (!data) return;
    if (data.page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Container width="lg">
      <h1>Articles</h1>
      <Button color="info" onClick={() => navigate('/addArticle')}>
        New Article
      </Button>

      <Suspense fallback={<Container>Loading...</Container>}>
        <div className={styles.articleList}>
          {data?.articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        <div className={styles.pagination}>
          <Button
            onClick={handlePreviousPage}
            disabled={data && data.page <= 1}
          >
            Previous
          </Button>
          <span>
            Page {data?.page} of {data?.totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={data && data.page >= data.totalPages}
          >
            Next
          </Button>
        </div>
      </Suspense>
    </Container>
  );
};

export default ArticlesListPage;
