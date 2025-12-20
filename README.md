# Syauqy.dev

My personal portfolio and blog website.

## Tech Stack

- **Framework**: Next.js 15.5
- **Language**: TypeScript
- **Styling**: TailwindCSS with Typography plugin
- **Content**: MDX for blog posts
- **UI Components**: Heroicons, Tippy.js for tooltips

## Features

- 📝 Blog with MDX support
- 🎵 Spotify integration (top artists)
- 📚 Pocket articles integration
- 💼 Project showcase
- 📜 Patents display
- 🌐 SEO optimized with next-seo

## Project Structure

```
├── components/          # React components
│   ├── blog/           # Blog-related components
│   ├── home/           # Homepage sections
│   ├── layouts/        # Layout components
│   ├── pages/          # Page-specific components
│   ├── pocket/         # Pocket integration
│   ├── spotify/        # Spotify integration
│   └── ui/             # Reusable UI components
├── data/
│   └── blog/           # MDX blog posts
├── lib/                # Utility functions and API helpers
├── pages/              # Next.js pages and API routes
│   ├── api/            # API endpoints
│   └── blog/           # Blog pages
├── public/
│   └── images/         # Static images
└── styles/             # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Spotify API
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=

# Pocket API
POCKET_CONSUMER_KEY=
POCKET_ACCESS_TOKEN=

# Site URL (used for sitemap/robots)
SITE_URL=https://syauqy.dev
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

- `npm run sitemap` - Generate `sitemap.xml` and `robots.txt` (run automatically after `npm run build` via `postbuild`)

## License

MIT
