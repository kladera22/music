const Song = require('../models/Song');

const getSongs = async (req, res, next) => {

    const filter = {};
    const options = {};

    if(Object.keys(req.query).length){
        const { 
            songTitle, 
            artist, 
            genre,
            limit,
            sortByArtist 
        } = req.query

        if(songTitle)filter.songTitle = true
        if(artist)filter.artist = true
        if(genre)filter.genre = true

        if(limit)options.limit = limit
        if(sortByArtist)options.sort = {
            artist: sortByArtist === 'asc' ? 1:-1
        }

        for(let i=0; i<filter.length; i++){
            console.log(`Searching song(s) by: ${filter[i]}`)
        }
    }

    try {
        const songs = await Song.find({}, filter, options);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(songs)
        
    } catch (err) {
        throw new Error(`Error retrieving songs: ${err.message}`);
    }
}

const postSong = async (req, res, next) => {

    try {
        const song = await Song.create(req.body);

        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(song)
        
    } catch (err) {
        throw new Error(`Error creating songs: ${err.message}`);
    }
}

const deleteSongs = async (req, res, next) => {
    
    try {
        await Song.deleteMany()
        
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true, msg: 'delete all songs'
        })

    } catch (err) {
        throw new Error(`Error deleting songs: ${err.message}`);
    }
}

const getSong = async (req, res, next) => {

    try {
        const song = await Song.findById(req.params.songId)

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(song)
        
    } catch (err) {
        throw new Error (`Error retrieving song(s) with id: ${req.params.songId}, ${err.message}`);
    }
}

const updateSong = async (req, res, next) => {

    try {
        const song = await Song.findByIdAndUpdate(req.params.songId,{
            $set: req.body
        },{
            new: true,
        });
        
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(song)

    } catch (err) {
        throw new Error (`Error updating song(s) with id: ${req.params.songId}, ${err.message}`)
    }
}

const deleteSong = async (req, res, next) => {

    try {
        await Song.findByIdAndDelete(req.params.songId)

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true, msg: `delete song with id: ${req.params.songId}`
        })

    } catch (err) {
        throw new Error (`Error deleting song(s) with id: ${req.params.songId}, ${err.message}`)
    }
}

const getSongRatings = async (req, res, next) => {

    try {
        const song = await Song.findById(req.params.songId)
        const ratings = song.ratings

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(ratings)

    } catch (err) {
        throw new Error (`Error retrieving song rating: ${err.message}`)
    }

}

const postSongRating = async (req, res, next) => {
    
    try {
        const song = await Song.findById(req.params.songId)
        song.ratings.push(req.body);
    
        const result = await song.save();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)

    } catch (err) {
        throw new Error (`Error creating rating: ${err.message}`)
    }
}

const deleteSongRatings = async (req, res, next) => {
    
    try {
        const song = await Song.findById(req.params.songId)

        song.ratings = []
        await song.save()

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true, msg: `delete all rating`
        })

    } catch (err) {
        throw new Error (`Error deleting ratings: ${err.message}`)
    }
}

const getSongRating = async (req, res, next) => {

    try {
        const song = await Song.findById(req.params.songId)
        const rating = song.ratings.find(rating => (rating._id).equals(req.params.ratingId))
            
        if(!rating) {rating = {success:false, msg: `No rating found with rating id: ${req.params.ratingId}`}}

        res
        .set(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating)

    } catch (err) {
        throw new Error (`Error retrieving raiting with id: ${req.params.ratingId}, ${err.message}`)
    }
}

const updateSongRating = async (req, res, next) => {

    try {
        const song = await Song.findById(req.params.songId)
        let rating = song.ratings.find(rating => (rating._id).equals(req.params.ratingId))
        
        if(rating){
            const ratingIndexPosition = song.ratings.indexOf(rating);
            song.ratings.splice(ratingIndexPosition, 1, req.body)
            rating = song.ratings[ratingIndexPosition]
            await song.save()
        }
        else{
            rating = {success:false, msg: `No rating found with id: ${req.params.ratingId}`}
        }
        
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating)
        
    } catch (err) {
        throw new Error (`Error updating rating with id: ${req.params.ratingId}, ${err.message}`)
    }
}

const deleteSongRating = async (req, res, next) => {

    try {
        const song = await Song.findById(req.params.songId)
        let rating = song.ratings.find(rating => (rating._id).equals(req.params.ratingId))

        if(rating) {
            const ratingIndexPosition = song.ratings.indexOf(rating)
            song.ratings.splice(ratingIndexPosition, 1)
            await song.save()
            rating = {success: true, msg: `delete rating with id: ${req.params.ratingId}`}
        }
        else{
            rating ={success:false, msg: `No rating found with rating id: ${req.params.ratingId}`}
        }

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating)

    } catch (err) {
        throw new Error (`Error deleting rating with id: ${req.params.ratingId}, ${err.message}`)
    }
}

module.exports = {
    getSongs,
    postSong,
    deleteSongs,
    getSong,
    updateSong,
    deleteSong,
    getSongRatings,
    postSongRating,
    deleteSongRatings,
    getSongRating,
    updateSongRating,
    deleteSongRating
}
