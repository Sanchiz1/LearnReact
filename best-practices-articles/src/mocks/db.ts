import { faker } from '@faker-js/faker';
import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from '@reduxjs/toolkit';
import { http, HttpResponse } from 'msw';
import { type Article } from '../behaviour/articles';

const db = factory({
  article: {
    id: primaryKey(String),
    title: String,
    content: String,
    created_at: () => new Date,
    updated_at: () => new Date,
  },
});

const createArticleData = (): Article => {
  const date = faker.date.past();
  return {
    id: nanoid(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    created_at: date,
    updated_at: date,
  };
};

Array.from({ length: 50 }).forEach(() => db.article.create(createArticleData()));

export const handlers = [
  http.get('/articles', ({ request }) => {
    const url = new URL(request.url)

    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const per_page = parseInt(url.searchParams.get('per_page') || '10', 10);

    const articles = db.article.findMany({
      take: per_page,
      skip: Math.max(per_page * (page - 1), 0),
      orderBy: { updated_at: 'desc' }
    });

    return HttpResponse.json({
      articles,
      page,
      totalPages: Math.ceil(db.article.count() / per_page),
      total: db.article.count(),
    },
    );
  }),

  http.get('/articles/:id', async ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    if (!id) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Article not found',
      });
    }

    const data = await db.article.findFirst({
      where: { id: { equals: id } },
    });

    if (!data) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Article not found',
      });
    }

    return HttpResponse.json(data);
  }),

  http.delete('/articles/:id', async ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    if (!id) {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Invalid article ID',
      });
    }

    const deleted = await db.article.delete({
      where: { id: { equals: id } },
    });

    if (!deleted) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Article not found',
      });
    }

    return new HttpResponse(null, {
      status: 204,
      statusText: 'Article deleted successfully',
    });
  }),

  http.put('/articles/:id', async ({ params, request }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    if (!id) {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Invalid article ID',
      });
    }

    const article = await request.json() as Article

    if (!article) {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Article cannot be empty',
      });
    }

    const updated = await db.article.update({
      where: { id: { equals: id } },
      data: {
        title: article.title,
        content: article.content,
        updated_at: new Date(),
      },
    });

    if (!updated) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Article not found',
      });
    }

    return HttpResponse.json(updated);
  }),


  http.post('/articles', async ({ request }) => {
    const article = await request.json() as Article

    if (!article) {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Article cannot be empty',
      });
    }

    article.id = nanoid();
    const now = new Date();
    article.created_at = now;
    article.updated_at = now;

    const created = await db.article.create(article);

    return HttpResponse.json(created);
  }),

  ...db.article.toHandlers('rest'),
] as const;
