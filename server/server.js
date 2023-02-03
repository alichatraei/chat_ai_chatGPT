import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import {Configuration, OpenAIApi} from "openai";


dotenv.config()
const app = express()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).send('Hello World!')
})

app.post('/', async (req, res) => {
    try {
        const question = res.body.question
        const response = openai.createConnection({
            model: "text-davinci-003",
            prompt: question,
            temperature: 0.7,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
        })
        res.status(200).send({
            body: response.data.choices[0].text
        })
    } catch (e) {
        console.log(e)
        res.status(500).send({e})
    }

})


app.listen(5000, () => {
    console.log("Application is running on http://localhost:5000")
})