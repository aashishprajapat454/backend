const dotenv = require('dotenv').config()
const mongoos = require('mongoose')

const MONGO_URI = process.env.MONGO_URI

const dbConnection = async ()=>{
    try {
        const connect = await mongoos.connect(MONGO_URI)
        console.log("database connected");
        
    } catch (error) {
        console.error('connction err', error)
    }
}

module.exports = dbConnection
// export {dbConnection}