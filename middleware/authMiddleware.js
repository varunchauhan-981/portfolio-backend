import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token is not valid!' });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: 'You are not authenticated!' });
  }
};

// MASTER FIX: Purane routes jo 'protect' maang rahe hain, unko bhi yahi function bhej do
export const protect = verifyToken;