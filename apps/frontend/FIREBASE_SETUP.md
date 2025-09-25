# Firebase Integration Setup

This project has been configured with Firebase for authentication, database, and storage functionality.

## Setup Instructions

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Follow the setup wizard to create your project

### 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click on the "Sign-in method" tab
3. Enable "Email/Password" authentication method

### 3. Get Firebase Configuration

1. Go to "Project Settings" (gear icon in the left sidebar)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (`</>`)
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Replace the placeholder values in `.env.local` with your actual Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your-actual-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-actual-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-actual-sender-id
   VITE_FIREBASE_APP_ID=your-actual-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-actual-measurement-id
   ```

### 5. Optional: Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location for your database

### 6. Optional: Enable Storage

1. In Firebase Console, go to "Storage"
2. Click "Get started"
3. Set up security rules (start in test mode for development)

## Usage

### Authentication

The project includes a complete authentication system:

- **Sign Up**: Create new user accounts with email/password
- **Sign In**: Authenticate existing users
- **Sign Out**: Log out authenticated users
- **Auth State Management**: Automatically track authentication status

### Available Components

- **Home Page** (`/`): Shows different content based on authentication status
- **Sign In Page** (`/about`): Handles both sign in and sign up functionality

### Firebase Services

The following Firebase services are configured and ready to use:

- **Authentication** (`src/firebase/auth.ts`): User authentication functions
- **Firestore** (`src/firebase/config.ts`): Database access
- **Storage** (`src/firebase/config.ts`): File storage access

### Vue Composable

Use the `useAuth` composable in your components:

```vue
<script setup>
import { useAuth } from '@/composables/useAuth'

const { user, login, register, logout, isLoading, error } = useAuth()
</script>
```

## Security Notes

- Never commit your `.env.local` file to version control
- The `.env.example` file is safe to commit as it contains no real credentials
- For production, set up proper Firebase security rules
- Consider enabling additional security features like email verification

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5174/` (or the next available port).