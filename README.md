# WinBig - Earn Rewards by Completing Simple Tasks

A modern, responsive web app where users complete simple tasks to earn real rewards.

## Features

✨ **Modern Design**
- Glassmorphic cards with soft rounded edges
- Drifting dollar sign animations on login/signup
- Poster-style task cards with cover images
- Responsive layout (mobile-first)
- Lime green & dark purple color scheme

💰 **Earn Rewards**
- Complete surveys, play games, follow social media
- Real-time point tracking
- Flexible task types (custom tasks, surveys, games, social)
- Glassmorphic glassmorphic UI

🔐 **Secure Authentication**
- Email + password auth via Supabase
- Session management
- Protected dashboard

## Setup

1. Clone the repository
```bash
git clone https://github.com/laptopperson4-source/winbig.git
cd winbig
```

2. Install dependencies
```bash
npm install
```

3. Create `.env.local` with your Supabase credentials
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run dev server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## Deployment

Deploy to Cloudflare Pages:
1. Push to GitHub
2. Connect repo to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `dist`

## Project Structure

```
src/
  ├── App.jsx         - Main app component
  ├── main.jsx        - Entry point
  ├── index.css       - Tailwind styles
  └── vite.config.js  - Vite configuration
```

## Colors

- **Background**: #0A0B0D (Dark black)
- **Accent**: #82E23E (Lime green)
- **Hover**: #9AE744 (Light lime)
- **Drifting $**: #20B2AA (Cyan)

## License

MIT
