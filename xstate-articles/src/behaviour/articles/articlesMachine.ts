import { assign, createMachine } from 'xstate';
import { Article } from './types';
import { defaultArticles } from './constants';

let nextId = 0;

export const articlesMachine = createMachine({
  types: {} as {
    context: {
      articles: Article[];
    };
    events:
    | { type: 'NEW_ARTICLE.ADD'; title: string; content: string }
    | { type: 'NEW_ARTICLE.UPDATE'; id: number, title: string; content: string }
    | { type: 'ARTICLE.REMOVE'; id: number };
  },
  id: 'articles',
  context: {
    articles: defaultArticles,
  },
  on: {
    'NEW_ARTICLE.ADD': {
      actions: assign({
        articles: ({ context, event }) => [
          ...context.articles,
          {
            id: nextId++,
            title: event.title,
            content: event.content,
          } as Article,
        ],
      }),
    },
    'NEW_ARTICLE.UPDATE': {
      actions: assign({
        articles: ({ context, event }) =>
          context.articles.map(article => {
            if (article.id === event.id) {
              article.title = event.title;
              article.content = event.content;
            }

            return article;
          }),
      }),
    },
    'ARTICLE.REMOVE': {
      actions: assign({
        articles: ({ context, event }) =>
          context.articles.filter((article) => article.id !== event.id),
      }),
    },
  },
});
