import { assign, fromPromise, setup } from 'xstate';

export const articleMachine = setup({
  types: {
    context: {} as {
      prevTitle: string;
      prevContent: string;
      title: string;
      content: string;
    },
    events: {} as
      | { type: 'SET_TITLE'; value: string }
      | { type: 'SET_CONTENT'; value: string }
      | { type: 'SAVE' }
      | { type: 'EDIT' }
      | { type: 'CANCEL' },
    input: {} as {
      title: string;
      content: string;
    },
    tags: {} as 'read' | 'form' | 'saving',
  },
  actors: {
    saveArticle: fromPromise(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    }),
  },
}).createMachine({
  id: 'article',
  initial: 'reading',
  context: ({ input }) => ({
    prevTitle: input.title,
    prevContent: input.content,
    title: input.title,
    content: input.content,
  }),
  states: {
    reading: {
      tags: 'read',
      on: {
        EDIT: 'editing',
      },
    },
    editing: {
      tags: 'form',
      on: {
        SET_TITLE: {
          actions: assign({ title: ({ event }) => event.value }),
        },
        SET_CONTENT: {
          actions: assign({ content: ({ event }) => event.value }),
        },
        SAVE: {
          target: 'saving',
        },
      },
    },
    saving: {
      tags: ['form', 'saving'],
      invoke: {
        src: 'saveArticle',
        onDone: {
          target: 'reading',
          actions: assign({
            prevTitle: ({ context }) => context.title,
            prevContent: ({ context }) => context.content,
          }),
        },
      },
    },
  },
  on: {
    CANCEL: {
      actions: assign({
        title: ({ context }) => context.prevTitle,
        content: ({ context }) => context.prevContent,
      }),
      target: '.reading',
    },
  },
});
