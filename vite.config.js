import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isProjectPage = process.env.GITHUB_ACTIONS === 'true' && repositoryName && !repositoryName.endsWith('.github.io')

export default defineConfig({
  plugins: [react()],
  // Relative assets keep exported previews portable when they are served from
  // a nested output folder (for example by an IDE preview server).
  base: isProjectPage ? `/${repositoryName}/` : './',
})
