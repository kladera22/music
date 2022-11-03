const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema ({
    rating: {
        type: Number,
        min: 1,
        max: 5, 
        required: true,
        validate: (rating) => {
            return typeof rating === 'number'
        }
    },

    text: {
        type: String,
        required: true
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{ 
    timestamps: true
})

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
    },

    ratings: [RatingSchema]
},{
    timestamps: true
})

module.exports = mongoose.model('Song', SongSchema);