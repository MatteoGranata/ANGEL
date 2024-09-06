import jwt from 'jsonwebtoken';
import { Project } from '../models/project.js';

export const authenticateToken = (req, res, next) => {
  // Extract the authorization token from the headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // Check if token is present
  if (token == null) return res.sendStatus(401).json({ message: 'Token nullo' });
  try {
    // Verify the token using the JWT secret from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };
    // If token is valid, proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token non valido' });
  }
};

export const authorizeUser = async (req, res, next) => {
  try {
    const projectId = req.params.id; // Get the project ID from the URL parameters
    const project = await Project.findById(projectId); // Fetch the project from the database

    if (!project) {
      return res.status(404).json({ message: 'Project not found' }); // Return 404 if the project doesn't exist
    }

    if (project.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to modify this project' }); // Return 403 if the user is not authorized
    }

    next(); // Proceed to the next middleware if authorized
  } catch (error) {
    res.status(500).json({ error: 'Server error' }); // Handle server errors
  }
};
