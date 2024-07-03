import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes from separate files for better organization
import usersRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';
import passwordRoutes from './routes/password.js';
import timerRoutes from './routes/timer.js';
import piggyBankRoutes from './routes/piggyBank.js';
import projectRoutes from './routes/project.js';

import { authenticateToken } from './middlewares/auth.js'; // Import middleware for token authentication

// Get the directory path of the current file (for static file serving)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

dotenv.config(); // Load environment variables from the `.env` file

const PORT = process.env.PORT || 3000; // Get the port number from the environment variable (or default to 3000)

app.use(mongoSanitize());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Middleware to serve static files (e.g., uploaded images) from the 'uploads' directory
app.use(cors());

// Define route prefixes and use corresponding route handlers with authentication middleware
app.use('/users', authenticateToken, usersRoutes);
app.use('/auth', authRoutes);
app.use('/post', authenticateToken, postRoutes);
app.use('/password', authenticateToken, passwordRoutes);
app.use('/timer', authenticateToken, timerRoutes);
app.use('/piggybank', authenticateToken, piggyBankRoutes);
app.use('/project', authenticateToken, projectRoutes);

// Connect to the MongoDB database using the connection URL from the environment variable
mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
    process.exit(1); // Exit the process if database connection fails
  });
