# Backend - Parameter Management API Server

A robust Express.js API server for managing configuration parameters with Firebase integration. Built with TypeScript, Firebase Admin SDK, and comprehensive security features.

## 🚀 Overview

This backend provides a secure and scalable API for parameter management with country-specific values. It features Firebase authentication, comprehensive error handling, and dual API endpoints for both admin panels and mobile applications.

### Key Features

- **RESTful API**: Complete CRUD operations for parameters
- **Country-Specific Values**: Support for parameter variations by country
- **Firebase Integration**: Authentication and Firestore database
- **Dual API Access**: Separate endpoints for admin panel and mobile clients
- **Security**: JWT token validation and CORS protection
- **Error Handling**: Comprehensive error management and logging
- **TypeScript**: Full type safety and modern development practices

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Firebase Firestore
- **Authentication**: Firebase Admin SDK
- **Security**: CORS, JWT validation
- **Development**: Nodemon, ts-node

## 📁 Project Structure

```
src/
├── config/
│   └── firebase.ts           # Firebase Admin configuration
├── controllers/
│   ├── parameterClientController.ts  # Mobile API logic
│   └── parameterPanelController.ts   # Admin panel logic
├── middleware/
│   └── auth.ts              # Authentication middleware
├── models/
│   ├── Parameter.ts         # Parameter model interface
│   └── User.ts              # User model interface
├── routes/
│   └── parameterRoute.ts    # API routes
├── services/
│   ├── parameterClientService.ts    # Mobile client business logic
│   └── parameterPanelService.ts     # Admin panel business logic
├── types/
│   └── api.ts               # API response types
├── utils/
│   └── responses.ts         # Response utilities
├── app.ts                   # Express app configuration
├── env.d.ts                 # Environment type definitions
└── server.ts               # Server entry point
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v20.19.0 or higher)
- npm or yarn
- Firebase project with Firestore enabled
- Firebase Admin SDK credentials

### Installation

1. **Navigate to backend directory**
   ```bash
   cd apps/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   
   Edit `.env`:
   ```env
   # Server Configuration
   PORT=4000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   
   # Firebase Admin SDK Configuration
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
   ...your-private-key...
   -----END PRIVATE KEY-----"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project-id.iam.gserviceaccount.com
   
   # Mobile App Configuration
   MOBILE_API_TOKEN=default-mobile-api-token-2024
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Verify server is running**
   
   Open http://localhost:4000/health in your browser

## 🔧 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Run tests (when implemented)
npm test
```

## 🌐 API Endpoints

### Health Check

```http
GET /health
```

Returns server status and health information.

### Admin Panel Endpoints

All admin endpoints require Firebase JWT authentication.

#### Get All Parameters
```http
GET /api/parameters
Authorization: Bearer <firebase-jwt-token>
```

#### Create Parameter
```http
POST /api/parameters
Authorization: Bearer <firebase-jwt-token>
Content-Type: application/json

{
  "key": "max_login_attempts",
  "description": "Maximum login attempts before lockout",
  "type": "NUMBER",
  "defaultValue": 3,
  "countryValues": {
    "US": 5,
    "TR": 3
  },
  "isActive": true
}
```

#### Update Parameter
```http
PUT /api/parameters/:id?country=:countryCode
Authorization: Bearer <firebase-jwt-token>
Content-Type: application/json

{
  "value": 5
}
```

#### Get Parameter by ID
```http
GET /api/parameters/:id
Authorization: Bearer <firebase-jwt-token>
```

#### Get Parameter by Key
```http
GET /api/parameters/key/:key
Authorization: Bearer <firebase-jwt-token>
```

#### Delete Parameter
```http
DELETE /api/parameters/:id
Authorization: Bearer <firebase-jwt-token>
```

### Mobile Client Endpoints

Mobile endpoints require API token authentication.

#### Get All Parameters for Country
```http
GET /api/parameters/config?country=:countryCode
X-API-Token: <mobile-api-token>
```

#### Get Parameter by Key for Country
```http
GET /api/parameters/config/:key?country=:countryCode
X-API-Token: <mobile-api-token>
```

## 🔐 Authentication

### Firebase JWT Authentication (Admin Endpoints)

```javascript
// Client-side: Get Firebase token
const user = firebase.auth().currentUser;
const token = await user.getIdToken();

// API call with token
fetch('/api/parameters', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### API Token Authentication (Mobile Endpoints)

```javascript
// Mobile API call
fetch('/api/parameters/config?country=US', {
  headers: {
    'X-API-Token': 'your-mobile-api-token'
  }
});
```

## 📊 Data Models

### Parameter Interface

```typescript
interface Parameter {
  id: string;
  key: string;
  description: string;
  value:{
    default: any;
    [countryCode: string]: any;
  };
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### API Response Format

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}
```

### Error Response Format

```typescript
interface ErrorResponse {
  success: false;
  message: string;
  timestamp: string;
  stack?: string; // Only in development
}
```

## 🏗️ Architecture

### Middleware Stack

1. **CORS**: Cross-origin resource sharing
2. **Body Parser**: JSON and URL-encoded parsing
3. **Authentication**: JWT token validation
4. **Error Handling**: Global error management
5. **Logging**: Request and error logging

### Controller Pattern

```typescript
export const parameterController = {
  async getAllParameters(req: Request, res: Response) {
    try {
      // Business logic
      const parameters = await parameterService.getAll();
      
      res.json({
        success: true,
        data: parameters,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      // Error handling
    }
  }
};
```

### Firebase Integration

```typescript
// Firebase Admin initialization
import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

export const db = admin.firestore();
export const auth = admin.auth();
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist` folder.

### Environment Variables for Production

Set these in your hosting platform:

```env
NODE_ENV=production
PORT=4000
FRONTEND_URL=https://your-frontend-domain.com
FIREBASE_PROJECT_ID=your-production-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
MOBILE_API_TOKEN=your-production-mobile-token
```

### Deployment Platforms

**Railway:**
1. Connect your GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on push

**Render:**
1. Connect your GitHub repository
2. Configure build and start commands
3. Set environment variables

**Heroku:**
```bash
# Install Heroku CLI
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set FIREBASE_PROJECT_ID=your-project-id
# ... set other environment variables
git push heroku main
```

**Manual VPS Deployment:**
```bash
# On your server
git clone your-repo
cd backend
npm install
npm run build
pm2 start dist/server.js --name "parameter-api"
```

## 🧪 Testing

### Automated Tests

```bash
# No automated tests currently implemented
# Testing framework (Jest) can be added for:

# Unit tests for controllers and services
# Integration tests for API endpoints
# Database tests for Firestore operations
```

### Manual Testing

Use tools like Postman or curl:

```bash
# Test health endpoint
curl http://localhost:4000/health

# Test admin endpoint (requires token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:4000/api/parameters

# Test mobile endpoint
curl -H "X-API-Token: YOUR_MOBILE_TOKEN" \
     "http://localhost:4000/api/parameters/config?country=US"
```

## 🔧 Configuration

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Firebase Configuration

```typescript
// Automatic initialization from environment variables
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};
```

## 🐛 Troubleshooting

### Common Issues

1. **Firebase connection errors**
   - Verify Firebase credentials
   - Check project ID and permissions
   - Ensure Firestore is enabled

2. **CORS errors**
   - Check FRONTEND_URL in environment
   - Verify origin configuration
   - Update allowed origins for production

3. **Authentication failures**
   - Verify Firebase Admin SDK setup
   - Check token format and expiration
   - Validate project configuration

4. **Port conflicts**
   - Change PORT in environment file
   - Check if port is already in use
   - Use `lsof -i :4000` to check port usage

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev

# Firebase debug mode
FIREBASE_AUTH_EMULATOR_HOST=localhost:9099 npm run dev
```

## 📈 Performance

### Current Implementation

- **Basic Express middleware**: CORS, JSON parsing, URL encoding
- **Request size limiting**: 10MB limit for JSON and URL-encoded data
- **Health monitoring**: Basic health check endpoint
- **Error handling**: Global error handler with development/production modes

### Current Monitoring

- Basic console logging
- Global error handler logging
- Health endpoint status
- Firebase built-in monitoring

---

**Backend built with ❤️ using Node.js, Express, and Firebase**