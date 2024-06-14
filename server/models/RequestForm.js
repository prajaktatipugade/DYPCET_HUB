const mongoose = require('mongoose');
const userScheme = new mongoose.Schema({
    Name: {
        type: String,
        require:true
    },
    Email: {
        type: String,
        require:true
    },
    ClubName: {
        type: String,
        require:true
    },
    ClubMotive: {
        type: String,
        require:true
    },
    department: {
        type: String,
        require:true
    },
    working: {
        type: String,
        require:true
    },
    status: {
        type: Boolean,
        default: false,
        required: true
    },
    password: {
        type: String,
        default: "admin123",
        required: "true"
    }
})

module.exports = mongoose.model("ClubRequestForm", userScheme);