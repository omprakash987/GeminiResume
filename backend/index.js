import express from 'express'; 
import dotenv from 'dotenv'; 
import authRoute from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import connectToDB from './lib/db.js';
import resumeRoute from './routes/resume.route.js'
import cors from 'cors'; 
import path from 'path'

dotenv.config(); 
const app = express(); 

const PORT = process.env.PORT || 5000 
const __dirname = path.resolve(); 
app.use(express.json({limit:'50mb'}));
app.use(cookieParser()); 
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist"))); 
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"frontend","dist","index.html")); 
    })
}

app.use('/api',authRoute); 
app.use('/api',resumeRoute);
app.listen(PORT,'0.0.0.0',()=>{
    console.log(`server started at port ${PORT}`)
    connectToDB(); 
})