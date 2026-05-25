# ⚡ HabitCore - Elite Habit Tracker Dashboard

HabitCore is a premium, multi-page single-page application (SPA) habit tracker designed to help users define daily routines, monitor weekly discipline streams, and analyze their consistency over time. Built strictly within a zero-overhead architecture, it delivers a high-end SaaS aesthetic with zero external framework dependencies.

🚀 **Live Deployment URL:** [Click Here to View the Live Application](PASTE_YOUR_VERCEL_OR_NETLIFY_LINK_HERE)

---

## ✨ Features

### 1. Multi-Page Architecture (SPA Routing)
Instead of a flat data grid, the application implements custom JavaScript routing to seamlessly switch between three high-fidelity dashboard workspaces without page refreshes:
* **Tracker Dashboard:** An interactive weekly discipline matrix featuring high-contrast glanceability, responsive swipe-safety (down to 360px), and today's column highlighting.
* **Analytics & Progress:** A metrics dashboard that automatically aggregates real-time check mark volumes, active schedules, and your record continuous daily momentum.
* **Settings & Profile:** A control center to manage your local data sandbox environment.

### 2. Chronological Left-to-Right Streak Engine
Features a logical forward-checking loop that builds your active consistency score starting from the beginning of the visible week (Monday) onward, breaking the chain the moment a day is missed to accurately mirror natural scanning patterns.

### 3. State Persistence
All created tracking entries, historic checkmarks, and routine alterations completely persist across deep browser cache clears and manual page reloads using browser `localStorage` synchronization.

---

## 🛠️ Stack & Technologies

* **Structure:** Semantic HTML5 Markup
* **Styling:** Custom CSS3 (Featuring dark-mode variables, glassmorphism, and neon glow micro-interactions)
* **Logic Engine:** Standalone Native JavaScript (ES6+ Runtime Core)
* **Hosting:** Vercel / Netlify Production Pipelines

---

## 🚀 How to Run Locally

Because this project is built using zero-build vanilla technologies, running it locally requires absolutely no configuration or terminal installations.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
