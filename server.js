const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger');
const song = require('./routes/song');
const artist = require('./routes/artist');
const user = require('./routes/user');
const error = require('./middlewares/error');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env'});

connectDB();

const app = express();


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(bodyParser.json())
app.use(logger);

app.use('/api/v1/song', song);
app.use('/api/v1/artist', artist);
app.use('/api/v1/user', user);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1))
})

