const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 5000

//Middleware
app.use(cors())
app.use(express.json())

// Connection string 
const uri = require('./config/keys').ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })


// Connection to mongodb
const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB succesfully connected')
})

//Require and Use files created
const userRouter = require('./routes/userRoute')
const bikeRouter = require('./routes/bikeRoute')
const bookingRouter = require('./routes/bookingRoute')
const login = require('./routes/Login')
app.use('/', userRouter)
app.use('/mybike', bikeRouter)
app.use('/login', login)
app.use('/bookings', bookingRouter)

// listen to port
app.listen(port, () => {
    console.log(`Server is started on port:  ${port}`)
})
