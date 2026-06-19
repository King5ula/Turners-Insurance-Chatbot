# Turners Car Insurance Chatbot - Backend API

This is the Node.js and Express backend server for the Turners Car Insurance Project (Mission 4). It connects securely to the Anthropic Claude API to provide dynamic insurance policy advice through the AI consultant, Tina.

## Project Structure

- `server.js` - Main server entry point
- `src/config/env.js` - Central environment configuration module
- `src/prompts/tinaPrompt.js` - Contains the insurance policy business rules
- `src/services/claudeServices.js` - Connects to the Anthropic Claude SDK
- `src/controllers/` & `src/routes/` - Handles network endpoints

## Prerequisites

Ensure you have **Node.js** installed.

## Setup Instructions

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root folder and add your credentials:

   ```env
   PORT=3000
   ANTHROPIC_API_KEY=your_actual_claude_api_key_here
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The server will start running at `http://localhost:3000`.

## Testing

To run the route and API integration tests:

```bash
npm run test
```
