import jwt from 'jsonwebtoken';

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
