import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import User from './models/user'
import jwt from 'jsonwebtoken'
import './websocket'
import { JWT_SECRET_TOKEN } from './utility'
const app = express()

mongoose.connect('mongodb+srv://Andrew:a19980828@cluster0.kkgn8.mongodb.net/Live_chat_room')

if (process.env.NODE_ENV !== 'production') {
    app.use(cors())
}
app.use(bodyParser.json())
app.get('/', (req, res) => {

    res.send('ok this is working')
})

app.post('/api/register', async (req, res) => {
    console.log(req.body)

    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ status: 'error', error: 'Invalid account/password' })
    }
    try {
        const user = new User({ email, password })
        await user.save()
    } catch (error) {
        console.log('Error', error)
        res.json({ status: 'error', error: 'Duplicate account' })
    }
    res.json({ status: 'ok' })
})

app.post('/api/login', async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    const user = await User.findOne({ email, password }).lean()
    console.log(User)
    if (!user) {
        return res.json({ status: 'error', error: 'User Not Found' })
    }
    const payload = jwt.sign({ email }, JWT_SECRET_TOKEN)
    return res.json({ status: 'ok', data: payload })
})

app.listen(1337,'140.124.93.194')