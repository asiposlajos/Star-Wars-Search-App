Application test task, usage permitted only for @sulcmartin04!

# Star Wars Character Search

A React Native application for searching and browsing Star Wars characters using SWAPI (Star Wars API). Built with Expo and TypeScript.

## Features

- Real-time character search by name
- Sort results by name, eye color, or creation date
- Pagination with page size options (25/50/100/150)
- Priority display for blue-eyed characters
- Responsive design for iOS, Android, and Web
- Comprehensive unit tests

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/asiposlajos/star-wars-search-app.git
   cd star-wars-character-search-app
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start development:

   ```sh
   npm start
   ```

4. Platform-specific builds:
   ```sh
   npm run ios    # iOS simulator
   npm run android # Android emulator
   npm run web    # Web browser
   ```

## Testing

Run the test suite:

```sh
npm test
```

## Tech Stack

- Expo SDK 52
- React Native 0.76
- TypeScript 5
- Expo Router 4
- Jest 29 + Testing Library

## Key Dependencies

- `@expo/vector-icons`@14
- `@react-native-picker/picker`@2
- `expo-blur`@14
- `expo-haptics`@14
- `react-native-reanimated`@3
- `jest-expo`@52
- `node-fetch`@3

## Project Structure

```
/star-wars-character-search-app
├── app/        # Screens (index.tsx, search.tsx)
├── components/ # UI components
├── types/      # Type definitions
└── **tests**/  # Test files
```

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

- SWAPI returns a maximum of 10 items per page
- No server-side filtering or sorting
- Rate limited to 30 requests per minute

## EAS Build

1. Install the Expo CLI (if not already installed):

   ```sh
   npm install -g expo-cli
   ```

2. Create an EAS account and login:

   ```sh
   eas login
   ```

3. Create a project (if not already created):

   ```sh
   eas project:create
   ```

4. Build the app:

   ```sh
   eas build:configure
   eas build --platform all
   ```

5. Submit the app to the app stores:
   ```sh
   eas submit --platform all
   ```
