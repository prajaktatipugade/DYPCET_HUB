// const { MonitorOutlined } = require('@ant-design/icons');
const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    username: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    password: {
        type: String,
        require:true
    }
})

module.exports = mongoose.model("Signup", userScheme);