require('dotenv').config();
const express = require('express');
const app = express();
const dbConnection = require('./server');
const User = require('./src/models/User');

const PORT = process.env.PORT || 8000;

app.use(express.json());

async function start() {
    await dbConnection(); // Wait for DB connection before inserting

    const newUser = new User({
        username: 'Aashish',
        email: 'aashishprajapat454@gmail.com',
        password: 'Aashish@123',
        role: "admin",
        isActive: true,
        profile: { firstName: 'aashish', lastName: 'Prajapat' }
    });

    await newUser.save();
    console.log(newUser);

    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
}

start();