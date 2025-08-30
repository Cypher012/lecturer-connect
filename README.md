# Lecturer Connect

Lecturer Connect is a modern web application for the Faculty of Computing, designed to help students discover, connect with, and learn more about their lecturers. The platform features lecturer recommendations, onboarding, AI-powered chat, and rich lecturer profiles.

## Features

- **Lecturer Discovery:** Search and filter lecturers by department, research area, and more.
- **Personalized Recommendations:** Get matched with lecturers based on your onboarding profile.
- **Onboarding Flow:** Guided onboarding to collect student preferences and academic interests.
- **AI Chat Assistant:** Chatbot to answer questions about lecturers, research, and courses.
- **Responsive UI:** Built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [shadcn/ui](https://ui.shadcn.com/).
- **Authentication:** User authentication and onboarding status checks.
- **Toast Notifications:** Custom toast system for user feedback.

## Project Structure

```
.
├── app/                  # Next.js app directory (routing, pages)
│   ├── dashboard/        # Dashboard page (student home)
│   ├── lecturers/        # Lecturer listing and profile pages
│   ├── onboarding/       # Onboarding flow for students
│   ├── recommendations/  # Personalized lecturer recommendations
│   ├── chat/             # AI chat assistant
│   └── layout.tsx        # Root layout (header, footer, providers)
├── components/           # Reusable UI and feature components
│   ├── ui/               # UI primitives (card, button, toast, etc.)
│   └── recommended-lecturers.tsx
├── hooks/                # Custom React hooks (e.g., use-toast)
├── lib/                  # Core logic (auth, matching, chatbot, mock-data)
├── public/               # Static assets
├── styles/               # Global and component styles
├── package.json
├── tsconfig.json
└── ...
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd lecturer-connect
   ```

2. **Install dependencies:**
   ```sh
   pnpm install
   ```

3. **Run the development server:**
   ```sh
   pnpm dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

```sh
pnpm build
pnpm start
```

## Key Files and Directories

- **[app/layout.tsx](app/layout.tsx):** Root layout, includes header, footer, and providers.
- **[components/header.tsx](components/header.tsx):** Main navigation and search bar.
- **[components/ui/toaster.tsx](components/ui/toaster.tsx):** Toast notification system.
- **[components/recommended-lecturers.tsx](components/recommended-lecturers.tsx):** Recommendations UI.
- **[lib/matching.ts](lib/matching.ts):** Lecturer matching logic.
- **[lib/chatbot.ts](lib/chatbot.ts):** AI assistant logic.
- **[hooks/use-toast.ts](hooks/use-toast.ts):** Toast hook for notifications.

## Customization

- **UI Theme:** Configured via [components.json](components.json) and Tailwind CSS.
- **Icons:** Uses [Lucide](https://lucide.dev/) icon library.
- **Mock Data:** Located in [lib/mock-data.ts](lib/mock-data.ts) for lecturers, departments, etc.

## Scripts

- `pnpm dev` – Start development server
- `pnpm build` – Build for production
- `pnpm start` – Start production server

## License

MIT

---

**Lecturer Connect** – Faculty of Computing  
Built with ❤️ using Next.js, Tailwind CSS, and