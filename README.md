# Padel Business Network

A responsive sales-funnel website for a curated UK business community built around padel.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The generated `dist` directory can be deployed to Vercel, Netlify, Cloudflare Pages or GitHub Pages.

## Publish with GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`. It builds and republishes the website whenever the `main` branch is pushed.

1. Create a new repository on GitHub. Do not add a README or `.gitignore` on GitHub because they already exist here.
2. Push this project to the repository's `main` branch.
3. Open the repository on GitHub and go to **Settings → Pages**.
4. Under **Build and deployment**, select **GitHub Actions** as the source.
5. Open the repository's **Actions** tab and wait for **Deploy website to GitHub Pages** to finish.

The shareable address will normally be `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`. The build automatically handles the repository-name portion of that URL.

## Connect the application form

The application experience is complete, but intentionally does not send data until a form endpoint is supplied. Create `.env.local` and add a Formspree-compatible endpoint:

```text
VITE_APPLICATION_ENDPOINT=https://formspree.io/f/your-form-id
```

Do not commit `.env.local`. When deploying, add the same environment variable in the hosting provider's project settings.

## Before launch

- Replace the provisional email address and Instagram link in `src/App.jsx`.
- Connect the application form endpoint.
- Add final membership pricing when agreed.
- Add privacy and terms pages before collecting applications.
- Replace or expand event information as the launch calendar is confirmed.

## Main visual asset

The custom hero photograph is stored at `public/images/pbn-hero.png`.
