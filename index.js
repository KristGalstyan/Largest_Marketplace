import express from 'express'
import router from './router/index.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { errorMiddleware } from './middleware/error.middleware.js'
dotenv.config()

const app = express()

app.use(express.json())

mongoose
  .connect(process.env.DATA_BASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB ok')
  })
  .catch((err) => {
    console.log('DB error', err)
  })

app.use('/api', router, errorMiddleware)

app.listen(process.env.PORT)
