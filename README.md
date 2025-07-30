# AI Medical Voice Agent

A Next.js application that revolutionizes patient care with AI-powered voice agents. Instantly analyze symptoms, book appointments, and generate EMR reports using cutting-edge AI.

## Features

- **Voice-Based Symptom Checker:** Patients describe symptoms verbally and receive real-time analysis.
- **Automated Appointment Booking:** AI assistant books appointments and sends reminders.
- **Real-Time EMR Summarization:** Converts voice conversations into structured EMR notes.
- **Sentiment & Tone Detection:** Understands patient emotion and urgency for better triage.
- **Specialist AI Agents:** Choose from a range of AI doctor agents for targeted consultations.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Clerk](https://clerk.com/) for authentication
- [Drizzle ORM](https://orm.drizzle.team/) & NeonDB for database
- [Google GenAI](https://ai.google.dev/) for medical suggestions and report generation
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vapi AI](https://vapi.ai/) for voice agent integration

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/ai-medical-voice-agent.git
   cd ai-medical-voice-agent
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your API keys and database URL.

4. **Run the development server:**
   ```sh
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure

- `src/` - Main source code
  - `app/` - Next.js app routes and pages
  - `components/` - UI and feature components
  - `config/` - Database and schema configuration
  - `helpers/` - AI integration logic
  - `lib/` - Utility functions
- `public/` - Static assets (doctor images, etc.)
- `shared/` - Shared lists and constants
