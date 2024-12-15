# Best practicies

1. Using memo

    ArtcileCard is wrapped in memo which lets skip re-rendering when its props are unchanged.

    ```js
    export default memo(ArticleCard)
    ```

2. Tagging for Cache Management

    Tags (providesTags and invalidatesTags) are used effectively to manage cache invalidation. This ensures the data remains consistent without manual state management.

    ```js 
    providesTags: (_result, _error, id) => [{ type: 'Article', id }],
    ```

3. Lazy Loading with React.lazy

    ArticleCard, Button, and Container are dynamically imported using React.lazy.
    Suspense is used to provide a fallback UI while the lazy-loaded components are being fetched.

    ```js 
    const ArticleCard = lazy(() => import('../ArticleCard/ArticleCard'));
    ```

4. Stable, predictable, and unique key attribute for lists of elements

    Using article unique id as key for articles list. It helps in performance in case of changes among list members.
    
    ```js 
    {data?.articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
    ))}
    ```

5. Paging

    Articles are fetched by pages which enures fast retreival of data due to limited number of requested articles.

6. HOC usage

    Created **withErrorDisplay** HOC to add error text to component. Used with Input component to display validation errors.

     
    ```js 
    type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
      error: string | null;
    }

    const Input = withErrorDisplay(({ ...props }: InputProps) => {
      return (
        <input
          {...props}
        />
      );
    });
    ``` 

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
