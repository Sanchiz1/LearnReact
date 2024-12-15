import { Article } from "./types";

export const ADD_ARTICLE = 'ADD_ARTICLE' as const;
export const addArticle = (title: string, content: string) => ({
  type: ADD_ARTICLE,
  payload: {
    title,
    content
  },
});

export const UPDATE_ARTICLE = 'UPDATE_ARTICLE' as const;
export const updateArticle = (article: Article) => ({
  type: UPDATE_ARTICLE,
  payload: {
    article,
  },
});

export const DELETE_ARTICLE = 'DELETE_ARTICLE' as const;
export const deleteArticle = (id: number) => ({
  type: DELETE_ARTICLE,
  payload: {
    id,
  },
});

export type ArticlesAction = ReturnType<
  | typeof addArticle
  | typeof updateArticle
  | typeof deleteArticle
>;
