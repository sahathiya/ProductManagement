const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()

 const connectDB=mongoose.connect(process.env.MONGO_CONNECTION_URL)
.then(()=>console.log('connected'))
.catch(()=>console.log('not connected'))

module.exports=connectDB