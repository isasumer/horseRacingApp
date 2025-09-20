# Horse Racing Simulation

A Vue.js application that simulates horse racing with animations and race management features.

## Features

### Core Racing

- 20 unique horses with individual characteristics
- 6 race rounds with different distances (1200m - 2200m)
- 10 horses per race, randomly selected

## How to Use

1. Click "GENERATE PROGRAM" to create a complete race schedule
2. Click "START" to begin the automated race sequence
3. Use "PAUSE"/"RESUME" to control race progression
4. Watch horses race in real-time on the track
5. Check the results panel to see race outcomes
6. Click "RESET" to clear everything and start over

### Horse System

- Each horse has condition rating (40-100)
- Individual speed ratings (90-100)
- Unique color coding for identification
- Race performance based on condition and speed

## Technical Stack

- Vue.js 3 with Composition API
- Vuex for state management
- SCSS with custom variables and mixins
- TypeScript for type safety
- Vite for development and building
- Vitest for unit testing, Cypress for E2E testing

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd horseRacing

# Install dependencies
npm install

# Start development server
npm run dev
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test:unit    # Run unit tests
npm run test:e2e     # Run E2E tests
npm run test:e2e:dev # Run E2E tests in development

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```
