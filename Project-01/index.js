const express = require('express');
const {connectMongoDB} = require('./connection')
const {logResReq} = require('./middleware')
const userRouter = require('./routes/user');
const app = express();
const PORT =8000;

//connection
connectMongoDB("mongodb://localhost:27017/ytnodeJS").then(()=>{
    console.log("Connection established")
});

//MIDDLEWARE -Plugin
app.use(express.urlencoded({ extended: false}));
app.use(logResReq("log.txt"));

//Routes
app.use('/api/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})