# SwasthElder - Medication Management System for an Old-Age Home

React + Vite + Tailwind CSS + React Router + Lucide React. Prototype with dummy data only.

## 1. Install
    npm install

## 2. Run the dev server
    npm run dev        # opens at http://localhost:5173

## 3. Build
    npm run build      # output in dist/
    npm run preview    # preview the production build

## 4. Change dummy data
Edit `src/data/dummyData.js` (residents, medications, schedule, notifications, activity, FAQs).
Edits are saved in the browser's localStorage. If you change the data file and don't see updates,
clear localStorage (DevTools > Application > Local Storage) or use "Reset demo data" on the Medication page.

## 5. Connect a real AI API later
Open `src/services/aiHealthAssistant.js`.
- Build a small backend endpoint that calls your AI provider (keep the API key on the server only).
- Set `VITE_AI_API_URL` in a `.env` file (see `.env.example`) to that endpoint.
- Return JSON shaped like `{ matched, symptoms[], causes[], medications[{name,purpose,important}], warnings[] }`.
- Keep the safety rules in your server-side prompt: no diagnosis, no personalised doses, always advise a doctor for elderly residents.
