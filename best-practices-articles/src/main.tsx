import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { worker } from './mocks/browser'

worker.start({ quiet: true }).then(() =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
)