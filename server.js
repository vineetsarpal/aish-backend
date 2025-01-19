import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { chain } from './utils/chains.js'
import { formatConvHistory } from './utils/formatConvHistory.js'
import { capture } from './utils/capture.js'
const app = express()

app.use(express.json())

const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(cors({
    origin: frontendURL
}))

app.get('/', (req, res) => {
    console.log(chain)
    res.send("Hello World!")
})

const convHistory = []
app.post('/chat', async (req, res) => {
    console.log("Chatting..")
    
    const { userInput } = req.body
    const question = userInput

    const result = await chain.invoke({
        question,
        conv_history: formatConvHistory(convHistory)
    })

    convHistory.push(question)
    convHistory.push(result)

    console.log(convHistory)
    
    res.json(result)
})

app.post('/capture', async (req, res) => {
    console.log('Capturing...')
    const { userInput } = req.body
    const info = userInput

    const result = await capture(info)

    res.json(result)
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on port: ${port})`)
})