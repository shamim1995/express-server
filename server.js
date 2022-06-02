const dotenv = require('dotenv').config()
const express = require('express')
const app = express()


//environment manage

const PORT = process.env.SERVER_PORT;
// Request body init

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//router manage
app.use('/api/student', require('./routes/students.js'))



// server listener
app.listen(PORT, ()=>{
    console.log(`our server is running on port ${PORT}`);
})