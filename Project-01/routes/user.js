const express = require('express');

const router = express.Router();

//routes
router.get('/users', async (req,res) =>{
    const allDBusers = await User.find({});
    const html =`
    <ul>
    ${allDBusers.map((users) => `<li>${users.firstname} - ${users.email}</li>`).join('')}
    </ul>
    `
    res.send(html);
})

//REST API
router.get('/api/users', async (req,res) =>{
    const allDBusers = await User.find({});
    return res.json(allDBusers);
})

router
   .route('/api/users/:id')
   .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({status: "error", message: "User not found"});
    }
    return res.json(user);
   })
   .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastname: "Changed"})
    return res.json({status: "success"});
})

.delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({status: "success"});
})

    
router.post('/api/users', async (req, res) => {
    //TODO: Create new user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({message: 'Invalid'});
    }
    
    const result = await User.create({
        firstname: body.first_name,
        lastname: body.last_name,
        email: body.email,
        jobtitle: body.job_title,
        gender: body.gender
    })

    console.log(result);

    return res.status(201).json({message: "success"}) ;
    
});


module.exports = router;