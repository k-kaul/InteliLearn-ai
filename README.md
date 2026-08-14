# InteliLearn AI - Connect with the right study partners, stay motivated, and achieve your learning goals together.

An AI-powered learning platform that intelligently matches you with the right learning partners based on your goals, interests, and learning style all in one seamless matching system.

## Features

### Core Technologies:

- Next.js App Router for server-side rendering, routing, and API endpoints with Server Components
- React for building interactive user interfaces with reusable components
- Clerk for secure authentication with Passkeys, Github, and Google Sign-in
- ShadcN UI for accessible, customizable React components with Radix UI primitives
- PostgreSQL for reliable database storage of users, communities, goals, and conversations
- Drizzle ORM for type-safe database queries and migrations
- TypeScript for static typing and enhanced development experience
- TailwindCSS 4 for responsive styling
- Zod for schema validation and form handling
- Google Gemini for AI-powered matching and conversation summaries
- Hono for lightweight, fast API endpoints
- TanStack React Query for efficient server state management

### Application Features:

- AI-powered semantic matching that understands learning goals beyond keywords
- Community-based learning with goal tracking and progress management
- Real-time chat with learning partners in dedicated conversations
- AI-generated conversation summaries with action items and next steps
- Secure authentication and protected routes
- Subscription tier management (FREE and PRO plans)
- Responsive design optimized for mobile and desktop
- Real-time toast notifications for updates and actions
- Dark/light theme support
- Smooth animations with Motion (Framer Motion)
- Production-ready deployment
- Performance optimizations with batch queries and caching
- Intelligent duplicate prevention and match optimization
- Tag-based goal categorization and filtering

## Getting Started

To get started with this project:

1. Fork the repo
2. Copy the `.env.example` variables into a separate `.env` file
3. Create the required credentials:
   - Clerk authentication keys
   - PostgreSQL database connection string
   - Google Gemini API key

## How to Fork and Clone

1. Click the "Fork" button in the top right corner of this repository to create your own copy
2. Clone your forked repository to your local machine
3. Install dependencies with `npm install`
4. Set up your environment variables in `.env`
5. Run database migrations with `npm db:push`
6. Seed the database with `npm db:seed`
7. Run the development server with `npm dev`

## Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
GOOGLE_GENERATIVE_AI_API_KEY=
```

## Database Setup

### Prerequisites

- PostgreSQL database (local or hosted)

### Setup Steps

1. Push the database schema:

```bash
npm db:push
```

2. (Optional but Recommended) Seed the database with test data:

```bash
npm db:seed
```

This creates:

- **5 FREE users** (demonstrating tier limits: 1 community, 1 goal each)
- **12 PRO users** (including test accounts with unlimited access)
- **6 diverse communities**:
  - Modern Full Stack Next.js Course
  - Developer to Leader
  - Ankita's Youtube Community
  - Python for Data Science
  - AI & Machine Learning
  - Cloud & DevOps
- **Learning goals** for each community
- **Sample matches** between users (both accepted and pending)
- **Conversations** with messages
- **AI-generated conversation summaries**

## Architecture

The application follows a modern full-stack architecture:

1. **Frontend**: Server-first with Next.js App Router, client components only where needed
2. **API Layer**: Hono framework ([app/api/[[...route]]/route.ts](app/api/[[...route]]/route.ts)) for lightweight, fast API
3. **Database**: PostgreSQL with Drizzle ORM ([db/schema.ts](db/schema.ts)) for type-safe queries
4. **Authentication**: Clerk handles all auth, session management, and user synchronization
5. **AI Services**: Vercel AI SDK with Google Gemini for matching and summaries
6. **State Management**: React Query for server state, React hooks for local state

### API Routes Structure

- `/api/communities/*` - Community management and discovery
- `/api/matches/*` - AI-powered and manual matching system
- `/api/conversations/*` - Chat, messaging, and AI summaries
- `/api/user/*` - User profile and subscription management

All routes use Clerk authentication middleware and Hono error handling.

## AI Features

### Semantic Matching

The AI matching system uses Gemini to analyze learning goals and find compatible partners:

- Understands goals beyond keyword matching
- Evaluates topic similarity, complementary skills, and learning styles
- Creates up to 3 curated matches per request
- Filters out existing matches to prevent duplicates

### Conversation Summaries

AI-generated insights from chat conversations include:

- **Summary**: 2-3 sentence overview of the discussion
- **Key Points**: Important topics and insights shared
- **Action Items**: Concrete tasks to follow up on
- **Next Steps**: Recommendations for future learning

## Subscription Tiers

### Free Tier

- 1 community
- 1 learning goal
- 3 active matches
- Unlimited conversations and messages

### Pro Tier

- Unlimited communities
- Unlimited learning goals
- Unlimited active matches
- Unlimited conversations and messages
- Priority AI matching
