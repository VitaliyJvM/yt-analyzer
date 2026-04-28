# YouTube Analyzer

A full-stack application designed to analyze YouTube content. This project consists of a NestJS backend and a React frontend.

## Project Structure

- **`/backend`**: The NestJS application that handles API requests, interacts with the YouTube API, and performs AI analysis using OpenAI.
- **`/frontend`**: The React application that provides the user interface for interacting with the analyzer.

## Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

## Getting Started

You can start both the backend and frontend simultaneously using the provided `make` command from the root directory.

1. First, make sure you install the dependencies in both directories:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   cd ..
   ```

2. Start the application:
   ```bash
   make start
   ```
   This command will run both the frontend and backend development servers in parallel.

3. Stop the application:
   If you ran the servers in the background or need to force close them, you can stop both the frontend and backend using:
   ```bash
   make stop
   ```
   *This command will find and kill the processes running on port 3000 (frontend) and 3001 (backend).*

### Running Separately

If you prefer, you can start them individually:

- **Backend**: `cd backend && npm run start:dev`
- **Frontend**: `cd frontend && npm start`

## Environment Setup

Before starting the application, you need to configure the environment variables for the backend. We have provided an example configuration file to make this easy.

1. Navigate to the backend directory (if you aren't already there) and copy the `.env.example` file to create a new `.env` file:
   ```bash
   cd backend
   cp .env.example .env
   ```
2. Open the newly created `.env` file and fill in your actual configuration values (such as your OpenAI API keys or YouTube Data API credentials).
