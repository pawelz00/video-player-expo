# YouTube-based Learning App

A React Native mobile application built with Expo that provides a learning experience through YouTube content.

## Features

- YouTube video integration
- Video search functionality
- Custom video player
- Guest login support
- Responsive layout with tabs navigation

## Tech Stack

- [Expo](https://expo.dev/) - React Native framework
- [React Query](https://tanstack.com/query/latest) - Data fetching and caching
- [Expo Router](https://docs.expo.dev/routing/introduction/) - File-based routing
- [React Native SVG](https://github.com/react-native-svg/react-native-svg) - SVG support
- Custom fonts (Poppins family)

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS testing)
- Android Studio (for Android testing)
- Youtube API key

## Installation

1. Clone the repository
2. Install dependencies:

```sh
npm install
```

3. Create .env file

You will need to add your YouTube API key in a `.env` file at the root of the project:

```
YOUTUBE_API_KEY="your_api_key"
```

## Running the App

Start the development server:

```sh
npx expo start
```

- Scan QR code with Expo Go app on your device

## Project Structure

```
app/              # Main application code
├── (tabs)/       # Tab-based navigation
├── details/      # Video details screens
├── _layout.tsx   # Root layout configuration
└── index.tsx     # Entry point/Login screen
assets/           # Static assets (images, fonts, etc.)
components/       # Reusable React components
constants/        # App-wide constants
hooks/            # Custom React hooks
```
