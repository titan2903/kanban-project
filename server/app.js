require('dotenv').config()
const express = require('express');
const app = express()
const Port = process.env.PORT || 3000
const cors = require('cors');
const Router = require('./router');


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(Router)

app.listen(Port, () => {
    console.log(`server running on Port: ${Port}`);
})