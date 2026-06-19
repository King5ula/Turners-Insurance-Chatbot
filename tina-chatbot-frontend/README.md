# Turners Car Insurance Chatbot - Frontend UI

This is the modern React frontend application for the Turners Car Insurance Project (Mission 4), built using Vite. It mimics the branding of the turners.co.nz website and features a responsive chat interface to talk to Tina.

## Features

- **Modern React Architecture**: Built with Vite and structured using clean components.
- **Advanced State Management**: Implements `useReducer` to track alternating conversation strings and loading states.
- **Branded Design**: Utilises official Turners corporate blues and crimson colors, complete with a clean avatar layout and scrolling loaders.

## Setup Instructions

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

## Core Components

- `src/App.jsx` - Root shell container rendering the dealership header
- `src/pages/InsuranceChatPage.jsx` - Main page handling the user loop UI and states
- `src/components/MessageBubble.jsx` - Custom chat bubble component dividing user and AI messages
- `src/services/tinaApi.js` - Manages fetching data directly from the port 3000 backend API
