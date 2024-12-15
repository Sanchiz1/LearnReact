import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Article } from './types'

type GetArticlesResponse = {
  articles: Article[],
  page: number,
  totalPages: number,
  total: number,
};

type GetArticleResponse = Article;

export const articlesApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Article'],
  endpoints: (build) => ({
    getArticles: build.query<GetArticlesResponse, number | void>({
      query: (page = 1) => `articles?page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.articles.map(({ id }) => ({ type: 'Article' as const, id })),
              { type: 'Article', id: 'LIST' },
            ]
          : [{ type: 'Article', id: 'LIST' }],
    }),
    addArticle: build.mutation<Article, Partial<Article>>({
      query: (body) => ({
        url: `articles`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Article', id: 'LIST' }],
    }),
    getArticle: build.query<GetArticleResponse, string>({
      query: (id) => `articles/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Article', id }],
    }),
    updateArticle: build.mutation<void, Pick<Article, 'id'> & Partial<Article>>({
      query: ({ id, ...patch }) => ({
        url: `articles/${id}`,
        method: 'PUT',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          articlesApi.util.updateQueryData('getArticle', id, (draft) => {
            Object.assign(draft, patch)
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Article', id }],
    }),
    deleteArticle: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `articles/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (_result, _error, id) => [{ type: 'Article', id }],
    }),
  }),
})

export const {
  useGetArticleQuery,
  useGetArticlesQuery,
  useAddArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articlesApi
