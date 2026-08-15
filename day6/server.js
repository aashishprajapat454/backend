const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose")

const DB_URI = process.env.MONGO_URI

console.log("URI is:", DB_URI);

const dbConnection = async () =>{
    try {
        const connect = await mongoose.connect(DB_URI);
        console.log("database successfully connected");
        
    } catch (error) {
        console.error(`here is an error ${error}`);        
    }
}

module.exports = dbConnection