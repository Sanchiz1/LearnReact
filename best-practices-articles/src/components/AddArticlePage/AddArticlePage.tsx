import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAddArticleMutation } from '../../behaviour/articles/service';
import Button from '../Button/Button';
import Container from '../Container/Container';
import Input from '../Input/Input';

const AddArticlePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [addArticle] = useAddArticleMutation()

  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (!title.trim().length) {
      setError("Title cannot be empty");
      return;
    }

    addArticle({ title, content })
      .then((res) =>
        res.data ? navigate('/article/' + res.data.id)
          : setError("Failed to add article"));
  };

  return (
    <Container width='lg'>
      <Input
        placeholder='Title'
        error={error}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder='Content'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={handleSave}>Save</Button>
      <Button onClick={() => navigate('/')}>Home</Button>
    </Container>
  );
};

export default AddArticlePage;