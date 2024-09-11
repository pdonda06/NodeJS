const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();

const PORT =8000;

//connection
mongoose.connect('mongodb://localhost:27017/ytnodeJS')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));





//MIDDLEWARE -Plugin
app.use(express.urlencoded({ extended: false}));


app.use((req, res, next) =>{
    fs.appendFile("log.txt", `${Date.now()}: ${req.method}: ${req.path}\n`, (err, data) =>{
        next();
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})