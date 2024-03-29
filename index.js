import express from 'express'
import router from './router/index.js'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

import cors from 'cors'

import mongoose from 'mongoose'
import { errorMiddleware } from './middleware/error.middleware.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200
  })
)

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

app.listen(process.env.SERVER_PORT)
