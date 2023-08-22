const express= require('express')
const cors = require('cors')
const connection = require('./db')
const userRouter = require('./Route/UserRoute')
const app = express()

app.use(express.json())
app.use(cors())

app.use("/user",userRouter)

app.listen(8080,async()=>{
try {
    await connection
    console.log('connected to db')
} catch (error) {
    console.log('db not connected')
}
console.log('server running on port 8080')
})
