import mongoose from "mongoose";
import "dotenv/config"

async function connectDB() {
try {
    await mongoose.connect(
        process.env.MONGO_URL
    );
    console.log("Connect to MongoDB");
    
    
} catch (error) {
    console.log(error);
    
}
}

export default connectDB