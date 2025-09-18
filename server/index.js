import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Connection from './config/db.js';
import { router as Router } from './routes/routes.js';

dotenv.config({ path: "./config/.env" });

const app = express();


// CORS configuration
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174']; // React dev servers
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.get('/', (req,res)=>{
    res.send({
        activeStatus:true,
        error:false,
    })
})
// Middleware
app.use(express.json());

// Database Connection
Connection();

// Routes
app.use('/contactmsyt', Router);

// Server start
app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT || 3000}`);
});
