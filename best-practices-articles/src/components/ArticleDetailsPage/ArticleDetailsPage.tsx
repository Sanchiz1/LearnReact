import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDeleteArticleMutation, useGetArticleQuery, useUpdateArticleMutation } from '../../behaviour/articles/service';
import Button from '../Button/Button';
import Container from '../Container/Container';
import ErrorText from '../ErrorText/ErrorText';
import styles from './ArticleDetail.module.scss';

const ArticleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: article, isLoading } = useGetArticleQuery(id ?? '');

  const [updateArticle] = useUpdateArticleMutation()

  const [deleteArticle] = useDeleteArticleMutation()

  const [editorMode, setEditorMode] = useState(false);

  const [editError, setEditError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article.content);
    }
  }, [article]);

  if (isLoading)
    return null;

  if (!article) {
    return (
      <Container width='lg'>
        <h1>Article not found</h1>
        <Button onClick={() => navigate('/')}>Home</Button>
      </Container>
    );
  }

  const handleEdit = () => {
    setEditorMode(editorMode => !editorMode)
  };

  const handleSave = () => {
    if (!title.trim().length) {
      setEditError("Title cannot be empty");
      return;
    }

    updateArticle({ id: article.id, title, content }).then(() => setEditorMode(false));
  };

  const handleDelete = () =>
    deleteArticle(article.id).then(() => navigate('/'));

  return (
    <Container width='lg'>
      <div className={styles.actionButtons}>
        <Button onClick={() => navigate('/')}>Home</Button>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleDelete} color='danger'>Delete</Button>
      </div>
      {!editorMode ?
        <>
          <h1>{article.title}</h1>
          <p>{article.content}</p>
        </>
        :
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <ErrorText error={editError} />
          <Button onClick={handleSave}>Save</Button>
        </>
      }
    </Container >
  );
};

export default ArticleDetailsPage;