import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log("Generated Token:", token); // Debugging

    res.cookie('jwt', token, { 
        httpOnly: true, 
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: 'strict', 
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
    });

    return token;
};
