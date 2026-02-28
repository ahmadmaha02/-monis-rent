# Monis Workspace Designer

Interactive workspace builder for `monis.rent` where users can configure a desk setup visually and rent it.

## Live Demo

- Vercel URL: `TBD`

## GitHub Repo

- Repository URL: `TBD`
- Collaborator added: `desent-bot` (Read access)

## Approach

I built a single-page interactive designer focused on speed and visual feedback.
Users can switch between desks, chairs, and accessories from a tabbed selector while the workspace canvas updates in real time.
A checkout panel on the right keeps total cost and rental duration visible at all times.

## Tech Choices

- Next.js (App Router + TypeScript)
- Tailwind CSS
- Vercel-ready deployment
- Local state with React hooks (`useState`, `useMemo`)

## Must-Haves Coverage

- Select desk from at least 2 options: yes (3 options)
- Select chair from at least 2 options: yes (3 options)
- Add accessories: yes (monitor, lamp, plant, drawer, speaker)
- Visual preview updates live: yes
- Summary or checkout view: yes (right-side checkout card)
- Public deployment: ready to deploy on Vercel
- Code on GitHub: ready, add `desent-bot` collaborator

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repo in Vercel.
3. Keep default build settings for Next.js.
4. Deploy and copy the live URL into this README.

## Add Reviewer Bot

In GitHub repo settings:

1. Go to `Settings -> Collaborators -> Add people`
2. Search `desent-bot`
3. Grant `Read` access

## With More Time

- Add drag-and-drop positioning for accessories on canvas
- Save and load configurations per user
- Add stock availability and delivery date API integration
