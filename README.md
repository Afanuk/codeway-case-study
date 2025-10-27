# Parameter Management System

A comprehensive full-stack application for managing configuration parameters across different countries and environments. Built with Vue.js, TypeScript, Express.js, and Firebase.

## 🚀 Project Overview

This system provides a robust solution for managing application parameters with country-specific values, featuring an admin panel for parameter management and a client API for mobile applications.

### Key Features

- **Parameter Management**: Create, read, update, and delete configuration parameters
- **Country-Specific Values**: Support for different parameter values per country
- **Authentication**: Firebase Authentication with JWT token validation
- **Manual Refresh**: Parameter updates require manual page refresh
- **Mobile API**: Dedicated endpoints for mobile applications
- **Admin Panel**: User-friendly interface for parameter management
- **Type Safety**: Full TypeScript implementation across frontend and backend

## 🏗️ Architecture

```
codeway-case-study/
├── apps/
│   ├── frontend/          # Vue.js Admin Panel
│   └── backend/           # Express.js API Server
└── README.md             # This file
```

### Tech Stack

**Frontend:**
- Vue.js 3 with Composition API
- TypeScript
- Vite (Build tool)
- Firebase Authentication
- Custom CSS styling

**Backend:**
- Node.js with Express.js
- TypeScript
- Firebase Admin SDK
- Firebase Firestore
- CORS middleware

## 🚦 Getting Started

### Prerequisites

- Node.js (v20.19.0 or higher)
- npm or yarn package manager
- Firebase project with Firestore enabled
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Afanuk/codeway-case-study.git
   cd codeway-case-study
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd apps/frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Configuration**
   
   See individual README files in `apps/frontend` and `apps/backend` for detailed environment setup.

4. **Start development servers**
   ```bash
   # Terminal 1: Start backend
   cd apps/backend
   npm run dev

   # Terminal 2: Start frontend
   cd apps/frontend
   npm run dev
   ```

5. **Access the application**
   - Admin Panel: https://codeway-case-study-ochre.vercel.app/
   - API Server: https://codeway-casestudy-176397680079.europe-west4.run.app
   - API Documentation: https://codeway-casestudy-176397680079.europe-west4.run.app/api

## 📚 API Documentation

### Admin Panel Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/parameters` | Get all parameters |
| POST | `/api/parameters` | Create new parameter |
| PUT | `/api/parameters/:id?country=:country` | Update parameter |
| GET | `/api/parameters/:id` | Get parameter by ID |
| GET | `/api/parameters/key/:key` | Get parameter by key |
| DELETE | `/api/parameters/:id` | Delete parameter |

### Mobile Client Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/parameters/config?country=:country` | Get all parameters for country |
| GET | `/api/parameters/config/:key?country=:country` | Get parameter by key for country |

### Authentication

All admin endpoints require Firebase JWT token:
```
Authorization: Bearer <firebase-jwt-token>
```

Mobile endpoints require API token:
```
X-API-Token: <mobile-api-token>
```

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:5173
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
MOBILE_API_TOKEN=your-mobile-api-token
```

**Frontend (.env.local):**
```env
NODE_ENV=development
VITE_API_BASE_URL=http://localhost:4000/api
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_MOBILE_API_TOKEN=your-mobile-api-token
```

## 🚀 Deployment

### Backend Deployment (Railway/Render)

1. **Prepare for deployment**
   ```bash
   cd apps/backend
   npm run build
   ```

2. **Set environment variables** in your hosting platform dashboard

3. **Deploy using Git** or platform-specific CLI

### Frontend Deployment (Vercel/Netlify)

1. **Build the application**
   ```bash
   cd apps/frontend
   npm run build
   ```

2. **Set environment variables** in your hosting platform dashboard

3. **Deploy the `dist` folder** or connect your Git repository

### Environment Configuration for Production

Update environment variables for production:

**Backend Production:**
- `NODE_ENV=production`
- `FRONTEND_URL=https://codeway-case-study-ochre.vercel.app`
- Use production Firebase credentials

**Frontend Production:**
- `NODE_ENV=production`
- `VITE_API_BASE_URL=https://codeway-casestudy-176397680079.europe-west4.run.app`
- Use production Firebase configuration

## 🧪 Testing

```bash
# No tests currently implemented
# Testing framework can be added as needed

# Manual testing can be done with:
cd apps/frontend && npm run dev
cd apps/backend && npm run dev
```

## 📝 Data Structure

### Parameter Schema

```typescript
interface Parameter {
  id: string;
  parameterKey: string;
  value: {
    default: any;
    [countryCode: string]: any;
  };
  description?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt?: Date;
}
```

### Example Parameter

```json
{
  "id": "param_123",
  "parameterKey": "max_login_attempts",
  "description": "Maximum login attempts before lockout",
  "value": {
    "default": 3,
    "US": 5,
    "TR": 3,
    "DE": 4
  },
  "createdBy": "user_abc123",
  "updatedBy": "user_def456",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## 🔒 Security Features

- **Firebase Authentication**: Secure user authentication
- **JWT Token Validation**: Server-side token verification
- **CORS Protection**: Configured for specific origins
- **Environment Variable Protection**: Sensitive data in environment files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: Afanuk
- **Company**: Codeway
- **Project**: Full-Stack Development Case Study

## 📞 Support

For support, email afanuk@hotmail.com or create an issue in the GitHub repository.

## 🔄 Version History

- **v1.0.0** - Initial release with full parameter management functionality
- **v0.9.0** - Beta release with core features
- **v0.1.0** - Project setup and basic structure

---

**Made with ❤️ for Codeway Company**
