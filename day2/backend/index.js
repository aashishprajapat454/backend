import dotenv from 'dotenv'
dotenv.config()
import express, { json } from 'express'
import cors from 'cors'
import { readFile } from "fs/promises"
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors())
const getUser = async () => {
    try {
        const user = await readFile('./users.json', 'utf8')
        const data = JSON.parse(user)
        return data
    } catch (error) {
        console.error(`new error ${error}`)
        return null;
    }
}
app.get("/api/user/:id", async (req, res) => {
    const id = req.params.id;
    const users = await getUser()
    if (!users || !Array.isArray(users.users)) {
        return res.status(500).json({ error: "failled to fatch user data" })
    }
    const user = users?.users?.find(u => u.id === id)
    if (!user) {
        return res.status(404).json({ error: "user not found" })
    }
    res.json(user)
})
app.listen(PORT, () => {
    console.log(`Server is runing at http://localhost:${PORT}`);
})