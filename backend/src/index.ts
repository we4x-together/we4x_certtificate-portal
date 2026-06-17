import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmetPkg from "helmet";
const helmet = (helmetPkg as any).default ?? helmetPkg;
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import certificateRoutes from './routes/certificateRoutes.js';
import { config, validateConfig } from './utils/config.js';

// Validate configuration on startup
try {
  validateConfig();
} catch (error: any) {
  console.error('Configuration Error:', error.message);
  process.exit(1);
}

const app = express();
const PORT = config.port;

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
      directives: {
        "frame-ancestors": ["'self'", config.corsOrigin]
      }
    }
  })
);
// CORS configuration
app.use(cors({
  origin: config.corsOrigin,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Logging middleware
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});

app.use('/api/', limiter);
app.use(express.json());

// Routes
app.use('/api/certificates', certificateRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error] ${new Date().toISOString()}:`, err);
  
  const status = err.status || 500;
  const message = config.nodeEnv === 'production' 
    ? 'An unexpected error occurred' 
    : err.message || 'An unexpected error occurred';

  res.status(status).json({
    error: message,
    ...(config.nodeEnv !== 'production' && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`Server is running in ${config.nodeEnv} mode on port ${PORT}`);
});
