# YouTube Analyzer - Backend

This is the backend portion of the YouTube Analyzer project. I built this using NestJS to handle API requests, interact with the YouTube Data API, and perform AI analysis using OpenAI.

## Technologies Used

- **NestJS**: The core Node.js framework I used to build an efficient, scalable backend.
- **TypeScript**: Ensures type safety and catches errors during development.
- **OpenAI API**: Used for analyzing video content and generating summaries.
- **YouTube Data API**: Used to fetch video metadata and transcripts.

## Environment Setup

Before running the backend, you must configure your environment variables. I have provided an example file to make this easy.

1. Copy the provided `.env.example` file to create a new `.env` file:
   ```bash
   cp .env.example .env
   ```
2. Open the newly created `.env` file and fill in your actual API keys and required configuration values.

## Getting Started

To get the backend up and running locally, follow these steps:

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Start the development server in watch mode:
   ```bash
   npm run start:dev
   ```

The application will start, and it will automatically reload if you make any changes to the code.
