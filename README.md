# Fauget E-commerce App 👋

A premium React Native application built with **Expo**, featuring a modern UI, robust state management, and real-time backend integration.

## 🚀 Features

- **Authentication Flow**: Complete login and signup experience with a sleek Fauget-themed design.
- **Supabase Backend**: Real-time database and authentication via Supabase.
- **Redux State Management**: Centralized application state using Redux Toolkit (slices and thunks).
- **Premium UI/UX**: Custom styled components, gradients, and blur effects for a high-end feel.
- **Biometic Login**: Support for Fingerprint/Face ID authentication.
- **Account Dashboard**: Personalized user profiles with order history and settings.
- **Expo Router**: Modern file-based routing for seamless navigation.

## 🛠️ Tech Stack

- **Core**: React Native, Expo
- **State Management**: Redux Toolkit, React-Redux
- **Backend**: Supabase (Postgres)
- **Routing**: Expo Router
- **Icons**: MaterialCommunityIcons, Ionicons
- **Styling**: React Native StyleSheet, Expo Linear Gradient, Expo Blur

## 📋 Getting Started

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add your credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
MONGODB_URI=your_mongodb_uri (optional)
```

### 4. Run the Development Server

```bash
npx expo start
```

## 🏗️ Project Structure

- `app/`: Routing and main screens (tabs, login, signup, api).
- `redux/`: Redux store, user slices, and thunks.
- `components/`: Reusable UI components.
- `models/`: TypeScript interfaces and types.
- `utils/`: Helper functions (biometrics, supabase client).
- `constants/`: Theme and color configurations.

## 🚢 Deployment

To export and update the app via EAS:

```bash
npx expo export && npx eas update --branch main
```

## 📚 Learn More

- [Expo documentation](https://docs.expo.dev/)
- [Supabase documentation](https://supabase.com/docs)
- [Redux Toolkit documentation](https://redux-toolkit.js.org/)
npx eas build --profile production --platform android