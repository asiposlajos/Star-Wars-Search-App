Application test task, usage permitted only for @sulcmartin04!

# Star Wars Character Search

A React Native application for searching and browsing Star Wars characters using SWAPI (Star Wars API). Built with Expo and TypeScript.

## Features

- Real-time character search by name
- Sort results by name/eye color/creation date
- Pagination with page size options (25/50/100/150)
- Priority display for blue-eyed characters
- Responsive design for iOS/Android/Web
- Comprehensive unit tests

## Installation

1. Clone repo:
   git clone --ezt átirni
   cd --ezt átirni

2. Install dependencies:
   npm install

3. Start development:
   npm start

4. Platform-specific builds:
   npm run ios # iOS simulator
   npm run android # Android emulator
   npm run web # Web browser

## Testing

npm test # Run test suite
npm run lint # Run linter

## Tech Stack

- Expo SDK 52
- React Native 0.76
- TypeScript 5
- Expo Router 4
- Jest 29 + Testing Library

## Key Dependencies

@expo/vector-icons@14
@react-native-picker/picker@2
expo-blur@14
expo-haptics@14
react-native-reanimated@3
jest-expo@52
node-fetch@3

## Project Structure

/src
├── app/ # Screens (index.tsx, search.tsx)
├── components/ # UI components
├── types/ # Type definitions
└── **tests**/ # Test files

## Implementation Highlights

1. Multi-page API fetching to handle SWAPI's 10-item limit
2. Client-side processing pipeline:
   - Separate blue-eyed characters
   - Sort groups independently
   - Combine results
3. State management:

   - Pagination with page size control
   - Sorting configuration
   - Loading/error states

4. UI Components:
   - Custom table with sortable headers
   - Responsive pagination controls
   - Cross-platform layouts

## Limitations

- SWAPI returns max 10 items/page
- No server-side filtering/sorting
- Rate limited to 30 requests/min

## EAS Build

1. Install the Expo CLI (if not already installed):
   npm install -g expo-cli

2. Create an EAS account and login:
   eas login

3. Create a project (if not already created):
   eas project:create

4. Build the app:
   eas build:configure
   eas build --platform all

5. Submit the app to the app stores:
   eas submit --platform all
