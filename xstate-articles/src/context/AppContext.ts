import { createActorContext } from '@xstate/react';
import { articlesMachine } from '../behaviour/articles';

export const ArticlesMachineContext = createActorContext(articlesMachine);