# Frontend - Parameter Management Admin Panel

A modern Vue.js application for managing configuration parameters with country-specific values. Built with TypeScript, Vite, and Firebase Authentication.

## 🚀 Overview

This frontend application provides an intuitive admin panel for managing application parameters. It features a responsive design, manual refresh updates, and comprehensive parameter management capabilities.

### Key Features

- **Parameter Management Interface**: Create, edit, and delete parameters
- **Country-Specific Values**: Edit parameter values for different countries
- **Firebase Authentication**: Secure user authentication with JWT tokens
- **Responsive Design**: Mobile-friendly interface
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Clean and intuitive user interface
- **Error Handling**: Comprehensive error management and user feedback

## 🛠️ Tech Stack

- **Framework**: Vue.js 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **Authentication**: Firebase Authentication
- **Styling**: Custom CSS with clean design patterns
- **Icons**: Heroicons and Tabler Icons
- **State Management**: Vue Composables

## 📁 Project Structure

```
src/
├── components/
│   ├── ParameterCard.vue      # Parameter display component
│   ├── ParameterList.vue      # Main parameter list
│   └── ParameterModal.vue     # Parameter editing modal
├── composables/
│   └── useAuth.ts             # Authentication composable
├── firebase/
│   ├── auth.ts               # Firebase auth configuration
│   └── config.ts             # Firebase configuration
├── pages/
│   ├── Home.vue              # Home page
│   ├── NotFound.vue          # 404 page
│   ├── Redirect.vue          # Redirect page
│   └── SignIn.vue            # Authentication page
├── router/
│   └── index.ts              # Vue Router configuration
├── services/
│   ├── parameterClientService.ts    # Mobile API service
│   └── parameterPanelService.ts     # Admin API service
├── types/
│   ├── api.ts                # API response types
│   └── parameter.ts          # Parameter types
├── utils/
│   └── timestamp.ts          # Date utilities
├── assets/
│   ├── base.css              # Base styles
│   ├── main.css              # Main styles
│   └── icon.png              # Application icon
├── App.vue                   # Root component
└── main.ts                   # Application entry point
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v20.19.0 or higher)
- npm or yarn
- Firebase project with Authentication enabled

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd apps/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables**
   
   Edit `.env.local`:
   ```env
   # Environment Configuration
   NODE_ENV=development
   
   # API Configuration
   VITE_API_BASE_URL=http://localhost:4000/api
   
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
   
   # Mobile App Configuration
   VITE_MOBILE_API_TOKEN=default-mobile-api-token-2024
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   
   Open http://localhost:5173 in your browser

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Build only (without type checking)
npm run build-only
```

## 🏗️ Architecture

### Component Architecture

```
App.vue
├── Router View
    ├── SignIn.vue (Authentication)
    ├── Home.vue
    │   ├── ParameterList.vue (Main component)
    │   │   ├── ParameterCard.vue (Parameter display)
    │   │   └── ParameterModal.vue (Edit modal)
    └── NotFound.vue (404 page)
```

### State Management

The application uses Vue 3 Composition API with composables for state management:

- **useAuth**: Authentication state and methods
- **Reactive refs**: Component-level state management
- **Service layer**: API communication

### Service Layer

- **parameterPanelService**: Admin panel API calls with authentication
- **parameterClientService**: Mobile client API calls
- **Firebase services**: Authentication and configuration

## 🔐 Authentication

The application uses Firebase Authentication with the following flow:

1. **Sign In**: Users authenticate with Firebase
2. **JWT Token**: Firebase provides JWT token
3. **API Calls**: Token sent with all admin API requests
4. **Auto Refresh**: Token automatically refreshed when needed

## 📱 Components

### ParameterList.vue

Main component that displays all parameters in a table format with:
- Parameter information display
- Edit and delete actions
- Modal integration
- Search and filtering capabilities

### ParameterModal.vue

Modal component for editing parameters with:
- Parameter details editing
- Country-specific value management
- Form validation
- Save/cancel functionality

### ParameterCard.vue

Display component for individual parameters with:
- Parameter information
- Action buttons
- Status indicators

## 🌐 API Integration

### Admin Panel API

```typescript
// Example API call
const createParameter = async (data: Parameter) => {
  const token = await user.value?.getIdToken();
  
  const response = await fetch(`${API_BASE_URL}/parameters`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  return response.json();
};
```

### Mobile Client API

```typescript
// Example mobile API call
const getParametersForCountry = async (country: string) => {
  const response = await fetch(
    `${API_BASE_URL}/parameters/config?country=${country}`,
    {
      headers: {
        'X-API-Token': import.meta.env.VITE_MOBILE_API_TOKEN
      }
    }
  );
  
  return response.json();
};
```

## 🎨 Styling

The application uses custom CSS with:

- **Modern design patterns**: Clean and minimal interface
- **Responsive design**: Mobile-first approach
- **Custom scrollbars**: Enhanced user experience
- **Interactive elements**: Hover states and transitions
- **Color scheme**: Professional dark/light theme support

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Environment Variables for Production

Set these in your hosting platform (Vercel, Netlify, etc.):

```env
NODE_ENV=production
VITE_API_BASE_URL=https://your-backend-domain.com/api
VITE_FIREBASE_API_KEY=your-production-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_MOBILE_API_TOKEN=your-production-token
```

### Deployment Platforms

**Vercel:**
1. Connect your GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on push

**Netlify:**
1. Drag and drop `dist` folder or connect Git
2. Set environment variables in dashboard
3. Configure build settings

**Manual Deployment:**
1. Build the project: `npm run build`
2. Upload `dist` folder to your web server
3. Configure environment variables on server

## 🔍 TypeScript

The project uses strict TypeScript configuration with:

- **Type definitions**: Complete type coverage
- **Interface definitions**: API response types
- **Component props**: Typed component interfaces
- **Composables**: Typed return values

### Key Types

```typescript
interface Parameter {
  id: string;
  key: string;
  description: string;
  type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON';
  defaultValue: any;
  countryValues: { [countryCode: string]: any };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
```

## 🧪 Testing

```bash
# Manual testing:
npm run dev  # Test in browser
```

## 🔧 Configuration

### Vite Configuration

The project uses Vite with:
- TypeScript support
- Vue SFC support
- Path aliases (`@/` for `src/`)
- Development server configuration
- Build optimization

### TypeScript Configuration

- Strict type checking
- Module resolution
- Path mapping
- Vue SFC support

## 📝 Development Guidelines

### Code Style

- Use Composition API for new components
- Follow TypeScript strict mode
- Use meaningful component and variable names
- Implement proper error handling
- Add JSDoc comments for complex functions

### Component Guidelines

- Keep components focused and single-purpose
- Use props for parent-child communication
- Use emits for child-parent communication
- Implement proper TypeScript types
- Handle loading and error states

### Best Practices

- Use environment variables for configuration
- Implement proper error boundaries
- Use semantic HTML elements
- Follow accessibility guidelines
- Optimize for performance

## 🐛 Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Ensure variables are prefixed with `VITE_`
   - Restart development server after changes

2. **Firebase authentication errors**
   - Check Firebase configuration
   - Verify project settings
   - Ensure proper domain configuration

3. **API connection issues**
   - Verify backend is running
   - Check CORS configuration
   - Validate API base URL

4. **Build errors**
   - Run type checking: `npm run type-check`
   - Check for unused imports
   - Verify all dependencies are installed

**Frontend built with ❤️ using Vue.js and TypeScript**
