import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import parameterRoutes from './routes/parameterRoute';

const app = express();

// Middleware
const frontendUrl = process.env._FRONTEND_URL || process.env.FRONTEND_URL;
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [frontendUrl].filter(Boolean) as string[]
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/parameters', parameterRoutes);

// Root endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Parameter Management API',
    version: '1.0.0',
    description: 'A comprehensive API for managing configuration parameters with country-specific values',
    
    authentication: {
      adminPanel: {
        type: 'Firebase JWT Token',
        header: 'Authorization: Bearer <firebase-jwt-token>',
        description: 'Required for all admin panel endpoints'
      },
      mobileClient: {
        type: 'API Token',
        header: 'Authorization: Bearer <mobile-api-token>',
        description: 'Required for mobile client endpoints'
      }
    },

    endpoints: {
      health: {
        url: '/health',
        method: 'GET',
        description: 'Health check endpoint',
        authentication: 'None',
        response: {
          status: 'ok',
          timestamp: '2024-01-01T00:00:00.000Z',
          version: '1.0.0',
          environment: 'development'
        }
      },

      adminPanel: {
        getAllParameters: {
          url: '/api/parameters',
          method: 'GET',
          description: 'Get all parameters for admin panel',
          authentication: 'Firebase JWT',
          response: 'Array of Parameter objects'
        },
        createParameter: {
          url: '/api/parameters',
          method: 'POST',
          description: 'Create a new parameter',
          authentication: 'Firebase JWT',
          body: {
            parameterKey: 'string (required)',
            description: 'string (optional)',
            value: {
              default: 'any (required)',
              'countryCode': 'any (optional)'
            }
          }
        },
        updateParameter: {
          url: '/api/parameters/:id',
          method: 'PUT',
          description: 'Update an existing parameter or country-specific value',
          authentication: 'Firebase JWT',
          params: { id: 'Parameter ID' },
          query: {
            country: 'Country code (optional, defaults to "default") - Used to update country-specific values'
          },
          body: {
            parameterKey: 'string (optional)',
            description: 'string (optional)',
            value: 'any - When country query is provided, updates only that country\'s value'
          },
          examples: [
            'PUT /api/parameters/123 - Updates default value',
            'PUT /api/parameters/123?country=TR - Updates Turkey-specific value',
            'PUT /api/parameters/123?country=US - Updates US-specific value'
          ]
        },
        getParameterById: {
          url: '/api/parameters/:id',
          method: 'GET',
          description: 'Get parameter by ID',
          authentication: 'Firebase JWT',
          params: { id: 'Parameter ID' }
        },
        getParameterByKey: {
          url: '/api/parameters/key/:key',
          method: 'GET',
          description: 'Get parameter by key',
          authentication: 'Firebase JWT',
          params: { key: 'Parameter key' }
        },
        deleteParameter: {
          url: '/api/parameters/:id',
          method: 'DELETE',
          description: 'Delete a parameter',
          authentication: 'Firebase JWT',
          params: { id: 'Parameter ID' }
        }
      },

      mobileClient: {
        getAllParametersForCountry: {
          url: '/api/parameters/config',
          method: 'GET',
          description: 'Get all parameters with country-specific values',
          authentication: 'API Token',
          query: {
            country: 'Country code (optional, defaults to "default")'
          },
          example: '/api/parameters/config?country=TR',
          response: 'Object with parameterKey: value pairs'
        },
        getParameterByKeyForCountry: {
          url: '/api/parameters/config/:key',
          method: 'GET',
          description: 'Get specific parameter value for country',
          authentication: 'API Token',
          params: { key: 'Parameter key' },
          query: {
            country: 'Country code (optional, defaults to "default")'
          },
          example: '/api/parameters/config/maxLoginAttempts?country=US',
          response: 'Parameter value for specified country or default'
        }
      }
    },

    dataStructure: {
      Parameter: {
        id: 'string - Unique identifier',
        parameterKey: 'string - Parameter key name',
        description: 'string - Optional description',
        value: {
          default: 'any - Default value',
          'countryCode': 'any - Country-specific value (e.g., TR, US, DE)'
        },
        createdBy: 'string - User ID who created',
        updatedBy: 'string - User ID who last updated',
        createdAt: 'Date - Creation timestamp',
        updatedAt: 'Date - Last update timestamp'
      }
    }
  });
});

// 404 handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

export default app;
