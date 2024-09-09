const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json')
const app = express();

const PORT =8000;

//MIDDLEWARE -Plugin
app.use(express.urlencoded({ extended: false}));


app.use((req, res, next) =>{
    console.log("Hello From Middleware 1");
    fs.appendFile("log.txt", `${Date.now()}: ${req.method}: ${req.path}\n`, (err, data) =>{
        next();
    })
})
// app.use((req, res, next) =>{
//     console.log("Hello From Middleware 2");
//     // return res.end("Hey");
//     next();
// })

//routes
app.get('/users',(req,res) =>{
    const html =`
    <ul>
    ${users.map((users) => `<li>${users.first_name}</li>`).join('')}
    </ul>
    `
    res.send(html);
})

//REST API
app.get('/api/users', (req,res) =>{
    res.setHeader("X-MyName", "Prince donda")
    return res.json(users);
})

app
   .route('/api/users/:id')
   .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    if(!user){
        return res.status(404).json({status: "error", message: "User not found"});
    }
    return res.json(user);
   })
   .patch((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
        return res.status(404).json({status: "error", message: "User not found"});
    }

    // Update user details with the new data sent in the request body
    users[userIndex] = { ...users[userIndex], ...req.body };
    
    // Save the updated users data to the file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({status: "error", message: "Failed to update user"});
        }
        return res.json({status: "success", updatedUser: users[userIndex]});
    });
})

.delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({status: "error", message: "User not found"});
    }

    // Remove user from the users array
    users.splice(userIndex, 1);

    // Save the updated users data to the file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({status: "error", message: "Failed to delete user"});
        }
        return res.json({status: "success", message: "User deleted"});
    });
})

    
    app.post('/api/users', (req, res) => {
    //TODO: Create new user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({message: 'Invalid'});
    }
    users.push({ ...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.status(201).json({status : "success", id: users.length})
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})