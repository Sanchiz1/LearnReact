import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArticlesMachineContext } from '../../context/AppContext';
import Button from '../Button/Button';
import Container from '../Container/Container'
import ErrorText from '../ErrorText/ErrorText';

export const AddArticle = () => {
  const navigate = useNavigate();
  const articlesActorRef = ArticlesMachineContext.useActorRef();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {

    if (!title.trim().length) {
      setError("Title cannot be empty");
      return;
    }

    articlesActorRef.send({
      type: 'NEW_ARTICLE.ADD',
      title,
      content,
    });

    navigate('/');
  };

  return (
    <Container width='lg'>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <ErrorText error={error}/>
      <Button onClick={handleSave}>Save</Button>

    </Container>
  );
};
