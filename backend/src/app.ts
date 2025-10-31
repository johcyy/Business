import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import routes from './routes';
// import { errorHandler } from './middleware/error.middleware';

const app: Express = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    message: 'BucketSwipe API is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
// TODO: Uncomment when routes are implemented
// app.use('/api', routes);

// Error handling middleware
// TODO: Uncomment when error middleware is implemented
// app.use(errorHandler);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'The requested resource was not found',
    },
  });
});

export default app;
