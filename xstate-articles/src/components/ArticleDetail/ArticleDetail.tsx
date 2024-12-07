import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Article } from '../../behaviour/articles';
import { ArticlesMachineContext } from '../../context/AppContext';
import Container from '../Container/Container';
import Button from '../Button/Button';
import styles from './ArticleDetail.module.scss';
import ErrorText from '../ErrorText/ErrorText';

export const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const articlesActorRef = ArticlesMachineContext.useActorRef();
  const state = ArticlesMachineContext.useSelector((state) => state);

  const articleId = Number(id);
  const article = state.context.articles.find(
    (article: Article) => article.id === articleId
  );

  const [editorMode, setEditorMode] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState(article?.title || '');
  const [content, setContent] = useState(article?.content || '');

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
      setError("Title cannot be empty");
      return;
    }
    articlesActorRef.send({
      type: 'NEW_ARTICLE.UPDATE',
      id: article.id,
      title,
      content,
    });

    setEditorMode(false);
  };

  const handleDelete = () => {
    articlesActorRef.send({ type: 'ARTICLE.REMOVE', id: articleId });
    navigate('/');
  };

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
          <ErrorText error={error} />
          <Button onClick={handleSave}>Save</Button>
        </>
      }
    </Container >
  );
};
