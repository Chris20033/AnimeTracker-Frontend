
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AnimeTrackerApp } from './AnimeTrackerApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AnimeTrackerApp/>
  </StrictMode>,
)
