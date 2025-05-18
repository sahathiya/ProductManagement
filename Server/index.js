const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const cookieparser=require("cookie-parser")
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
dotenv.config()


const PORT=process.env.PORT||5000
const app=express()
app.use(express.json())
app.use(cors({
  origin: 'https://product-management-sahathiyas-projects.vercel.app',
  credentials: true
}));


app.use(cookieparser())
app.use('/api',userRoutes)

connectDB
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
    
})

