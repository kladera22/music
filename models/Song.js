const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema ({
    songTitle: {
        type: String,
        unique: true,
        required: true,
        maxLength: 20
    },

    artist: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Song', SongSchema);