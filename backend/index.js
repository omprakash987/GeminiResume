import express from 'express'; 
import dotenv from 'dotenv'; 
import authRoute from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import connectToDB from './lib/db.js';
import resumeRoute from './routes/resume.route.js'
import cors from 'cors'; 

dotenv.config(); 
const app = express(); 

const PORT = 8000||process.env.PORT; 
app.use(express.json({limit:'50mb'}));
app.use(cookieParser()); 
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.get("/",(req,res)=>{
    res.send("hello")
}); 

app.use('/api',authRoute); 
app.use('/api',resumeRoute);
app.listen(8000,()=>{
    console.log(`server started at port ${PORT}`)
    connectToDB(); 
})