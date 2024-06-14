const mongoose = require('mongoose');

const addMembersSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },  
    position: {
        type: String,
        required: true
    },
    linkedlnLink: {
        type: String,
        required: true
    },
    instaLink: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("addMembers", addMembersSchema);