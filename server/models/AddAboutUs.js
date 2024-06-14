const mongoose = require('mongoose');

const addAboutUsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    logoImage: {
        type: String,
        required: true
    },
    aboutInfo: {
        type: String,
        required: true
    },  
    mission: {
        type: String,
        required: true
    },
    // missionImage: {
    //     type: String,
    //     required: true
    // },
    vision: {
        type: String,
        required: true
    }
    // visionImage: {
    //     type: String,
    //     required: true
    // }
})

module.exports = mongoose.model("addAbout", addAboutUsSchema);