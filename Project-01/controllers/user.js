const User = require('../models/user');

async function handleGetAllUsers(req, res){
    const allDBusers = await User.find({});
    return res.json(allDBusers);
}

async function handleGetUserById(req, res){
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({status: "error", message: "User not found"});
    }
    return res.json(user);
}
async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id, {lastname: "Changed"})
    return res.json({status: "success"});
}
async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id)
    return res.json({status: "success"});
}
async function handleCreateUser(req,res){
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

    return res.status(201).json({message: "success", id: result._id}) ;
}



module.exports ={
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser,
}