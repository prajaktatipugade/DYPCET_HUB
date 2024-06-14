const mongoose = require('mongoose');

const addEventsSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },  
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("addEvents", addEventsSchema);