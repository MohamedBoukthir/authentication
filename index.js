const express = require('express')
const cors = require ('cors')

const app = express()
require('dotenv').config()

const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')

const connection = require('./database')


//Mongo Connection 
connection();


//Routes
app.use('/api/users' , userRoute)
app.use('/api/auth' , authRoute)


//middleware 
app.use(express.json())
app.use(cors())



const port = process.env.PORT|| 8080;
app.listen(port , () => console.log(`Listening on port ${port} `));