import dotenv from 'dotenv';
dotenv.config();  // Load environment variables first

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';  // For handling cookies
import authRoutes from './routes/auth.route.js';
import connectDB from './lib/db.js';

const PORT = process.env.PORT || 5001;
const app = express();

// Use CORS middleware to allow requests from your frontend (localhost:5173)
app.use(cors({
  origin: 'http://localhost:5173',  // Allow frontend from this origin
  methods: ['GET', 'POST'],  // Allowed methods
  credentials: true,  // Allow cookies to be sent
}));

app.use(cookieParser());  // Parse cookies, required for JWT in cookies

app.use(express.json());

// Log the value of MONGO_URI to ensure it's loaded correctly
console.log("Mongo URI: ", process.env.MONGODB_URI); // This should print the Mongo URI

app.use('/api/auth', authRoutes);  // Use your auth routes

// Connect to DB
connectDB(); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
