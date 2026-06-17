require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const user = async (id) => {
    try {
        const response = await fetch(`https://dummyjson.com/users/${id}`)
        const userData = await response.json()
        return userData

    } catch (error) {
        console.error(`It's just a ${error.message}`);

    }

}

app.get('/', (req, res) => {
    res.send("hello from server")
})

app.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id
        const fatchUser = await user(id)
        res.send(fatchUser)
    } catch (error) {
        console.error(`user side ${error.message}`);

    }
})
app.listen(PORT, () => {
    console.log(`server is listing on http://localhost:${PORT}`);
})