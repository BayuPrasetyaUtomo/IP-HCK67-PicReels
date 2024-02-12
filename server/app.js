if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require("cors")
const router = require('./routes')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app
