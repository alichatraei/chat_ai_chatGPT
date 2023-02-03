import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import {Configuration, OpenAIApi} from "openai";

dotenv.config()
console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).send('Hello World!')
})

app.post('/', async (req, res) => {
    try {
        const question = req.body.question
        const response = await openai.createCompletion({
            model:"text-davinci-003",
            prompt: question,
            temperature: 0,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0.2,
            presence_penalty: 0,
        })
        console.log(response)
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