# CineSearch - Movie Discovery App

CineSearch is a full-featured movie discovery application built with React, Tailwind CSS, and the OMDB API. It allows users to search for movies, view detailed information, and manage a personal collection of favorites.

## Features

- **Movie Search**: Search for any movie title or keyword.
- **Type Filtering**: Filter results by Movie, Series, or Episode using the OMDB API.
- **Pagination**: Navigate through large sets of search results.
- **Detailed View**: View comprehensive information about any movie, including plot, cast, ratings, and more.
- **Favorites Management**: Save movies to your favorites list for quick access.
- **Responsive Design**: Fully optimized for mobile and desktop screens.
- **Modern UI**: Built with Tailwind CSS for a premium look and feel.

## Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **API**: OMDB API

## Getting Started

### Prerequisites

- Node.js installed
- pnpm installed (`npm install -g pnpm`)

### Installation

1. Clone or download the repository.
2. Open the terminal and navigate to the project directory.
3. Install dependencies:
   ```bash
   pnpm install
   ```

### API Key Setup

1. Get a free API key from [OMDB API](https://www.omdbapi.com/apikey.aspx).
2. Open `src/services/omdbApi.js`.
3. Replace `'YOUR_API_KEY'` with your actual API key:
   ```javascript
   const API_KEY = "your_key_here";
   ```

### Running the App

Start the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`.

## Deployment

### Deploying to Netlify (Recommended)

1.  Connect your GitHub repository to [Netlify](https://www.netlify.com/).
2.  In the Netlify dashboard, go to **Site settings > Environment variables**.
3.  Add a new variable:
    - Key: `VITE_OMDB_API_KEY`
    - Value: `your_actual_key_here`
4.  Trigger a new deploy.

The application is already configured with a **Netlify Function proxy** to keep your API key secure in production.

To create a production build:

```bash
pnpm build
```

The optimized files will be in the `dist/` directory.
