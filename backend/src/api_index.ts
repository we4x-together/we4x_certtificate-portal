import serverless from 'serverless-http';
import app from './app.js';

// Export a standard handler for Vercel (and other serverless platforms)
export default serverless(app);
