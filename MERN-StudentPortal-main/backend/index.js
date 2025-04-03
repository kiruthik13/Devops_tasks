const express = require('express')
const cors =  require('cors')
const colors = require('colors');
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')

const studentRoute = require('./routes/studentRoute')


const port = process.env.PORT || 5000


connectDB()

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.use('/students', studentRoute)





app.listen(port, ()=> console.log(`Server started on port ${port}`))








