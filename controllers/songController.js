const Song = require('../models/Song');
// '/' endpoint

const getSongs = async (req, res, next) => {
    if(Object.keys(req.query).length){
        const { 
            songTitle, 
            artist, 
            genre 
        } = req.query

        const filter = [];


        if(songTitle)filter.push(songTitle);
        if(artist)filter.push(artist);
        if(genre)filter.push(genre);

        for(let i=0; i<filter.length; i++){
            console.log(`Searching song(s) by: ${filter[i]}`)
        }
    }

    try {
        const result = await Song.find();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
        
    } catch (err) {
        throw new Error(`Error retrieving songs: ${err.message}`);
    }
    
}

const postSong = async (req, res, next) => {

    try {
        const result = await Song.create(req.body);

        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(result)
        
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

// '/songId' endpoint

const getSong = async (req, res, next) => {

    try {
        const result = await Song.findById(req.params.songId)

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
        
    } catch (err) {
        throw new Error (`Error retrieving song(s) with id: ${req.params.songId}, ${err.message}`);
    }
   
}

const updateSong = async (req, res, next) => {

    try {
        const result = await Song.findByIdAndUpdate(req.params.songId,{
            $set: req.body
        },{
            new: true,
        });
        
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)

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

module.exports = {
    getSongs,
    postSong,
    deleteSongs,
    getSong,
    updateSong,
    deleteSong
}
