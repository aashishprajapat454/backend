const dotenv = require('dotenv').config()
const dbConnection = require('./db/index')
const dns = require('dns')
// const app = require('./app')
const PORT = require(process.env.PORT)

dns.setServers(['8.8.8.8','1.1.1.1'])

dbConnection()
.then(() =>{
    app.listen(PORT,() =>{
        console.log(`server is runing at ${PORT}`);
        
    })
})
.catch((err) =>{
    console.log('mongo db connection faild',err);
    
})