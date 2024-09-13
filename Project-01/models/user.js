const express = require('express');
const mongoose = require('mongoose');

//Schema
const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    jobtitle:{
        type: String,
    },
    gender:{
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'],
    },
},
{timestamps:true},
);

//model
const User = mongoose.model('user', userSchema);

module.exports = User;