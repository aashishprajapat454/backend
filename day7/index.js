const dotenv = require('dotenv').config()
const express = require('express')
const mogoose = require('mongoose')
const app = express()
// const dns = require('node:dns')

DB_URI = process.env.MONGO_URI
PORT = process.env.PORT

app.use(express.json())

const dbConnection = async () =>{
    try {
        const connection = await mogoose.connect(DB_URI)
        console.log('database connected');
        
    } catch (error) {
        console.error(`connction error ${error}`)
    }
}
dbConnection()
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})