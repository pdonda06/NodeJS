const express = require('express');

const app = express();

app.get('/', (req,res) => {
    return res.send("Hello from Home Page" + req.query.name);
})

app.get("/about", (req,res) => {
    return res.send("Hello from About Page");
})

app.listen(3000, () => {
    console.log("Starting");
})
