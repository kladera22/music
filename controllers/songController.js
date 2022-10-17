// '/' endpoint

const getSongs = (req, res, next) => {
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
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({
        success: true, msg: 'show me all songs'
    })
}

const postSong = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json({
        success: true, msg: `add song with the following fields:
        Song title: ${req.body.songTitle}
        Artist: ${req.body.artist}
        Genre: ${req.body.genre}`
    })
}

const deleteSongs = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({
        success: true, msg: 'delete all songs'
    })
}

// '/songId' endpoint

const getSong = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({
        success: true, msg: `delete song wit id: ${req.params.songId}`
    })
}

const updateSong = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({
        success: true, msg: `update song with id: ${req.params.songId}`
    })
}

const deleteSong = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({
        success: true, msg: `delete song with id: ${req.params.songId}`
    })
}

module.exports = {
    getSongs,
    postSong,
    deleteSongs,
    getSong,
    updateSong,
    deleteSong
}
