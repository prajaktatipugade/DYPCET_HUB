const mongoose = require('mongoose');

const addLiveEventsSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true
    }, 
    start: {
        type: String,
        required:true
    },
    heading: {
        type: String,
        required: true
    },  
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },  
    fees: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("addLiveEvents", addLiveEventsSchema);