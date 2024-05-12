const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/backend").then(()=>{
    console.log('MongoDB connected')
}).catch((error)=> {
    console.log(error)
})