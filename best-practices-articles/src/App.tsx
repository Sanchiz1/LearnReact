import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router';
import AddArticlePage from './components/AddArticlePage/AddArticlePage';
import ArticleDetailsPage from './components/ArticleDetailsPage/ArticleDetailsPage';
import ArticlesListPage from './components/ArticlesList/ArticlesListPage';
import { store } from './behaviour';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ArticlesListPage />} />
          <Route path="/addArticle" element={<AddArticlePage />} />
          <Route path="/article/:id" element={<ArticleDetailsPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
