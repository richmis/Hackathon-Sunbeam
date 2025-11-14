const express = require('express')
const cors = require('cors')

//user defined modules

const userRouter = require('./routes/users')
const reviewRouter=require('./routes/reviews')
const app = express()

//middleware
app.use(cors())
app.use(express.json())

app.use('/users', userRouter)
app.use('/reviews', reviewRouter)



app.listen(4000, 'localhost', () => {
    console.log('server started at port 4000')
})