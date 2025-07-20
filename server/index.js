import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import UserRouter from "./routes/User.js";
import ProductRoutes from "./routes/Products.js";
dotenv.config() ;

const app = express() ;
app.use(cors()) ;
app.use(express.json({ limit: '10mb' })) ;
app.use(express.urlencoded({ extended: true })) ;

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.get("/", async (req, res) => {
    res.status(200).json({ 
        message: "Server is running" 
    }) ;
})

app.use("/api/user/", UserRouter);
app.use("/api/products/", ProductRoutes);

const connectDB = () => {

    mongoose.set('strictQuery', true) ;

    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        tlsAllowInvalidCertificates: false,
    })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.error("MongoDB connection error:", error));
}

const startServer = async () => {
    try {
        connectDB() ;
        app.listen(8000, () => console.log("Server is running on port 8000")) ;
    } catch (error) {
        console.error("Error starting the server:", error);
    }
}

startServer() ;