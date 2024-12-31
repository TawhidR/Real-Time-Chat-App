import mongoose from 'mongoose'; // ES6 module import (for modern Node.js)

 const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB is connected');
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;