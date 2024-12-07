import { Route, BrowserRouter as Router, Routes } from 'react-router';
import { ArticleDetail } from './components/ArticleDetail/ArticleDetail';
import { ArticlesList } from './components/ArticlesList/ArticlesList';
import { ArticlesMachineContext } from './context/AppContext';
import { AddArticle } from './components/AddArticle/AddArticle';

const App = () => {
  return (
    <ArticlesMachineContext.Provider>
      <Router>
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/addArticle" element={<AddArticle />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </Router>
    </ArticlesMachineContext.Provider>
  );
};

export default App;
