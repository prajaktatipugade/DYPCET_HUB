const mongoose = require('mongoose');

const addGallerySchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
   
})

module.exports = mongoose.model("addGallery", addGallerySchema);