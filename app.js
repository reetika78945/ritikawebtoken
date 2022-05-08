require('dotenv').config();
const express = require('express');
const app =  express();
var bodyParser = require('body-parser')
const userRouter = require('./api/users/user_routes');

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use('/api/users', userRouter);
app.listen(process.env.APP_PORT, (req, res) => {
    console.log(`app is running at port ${process.env.APP_PORT}...`)
})