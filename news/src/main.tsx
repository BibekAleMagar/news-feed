import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { queryClient } from './lib/react-query.ts'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='/news-feed'>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster position='top-center' />
        <ReactQueryDevtools initialIsOpen={false}  />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
