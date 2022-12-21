const debug = require('debug')('todo:mongodb');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

/**
 * @returns {Promise<Connection>}.
 */
function connect() {
    const autoIndex = Boolean(process.env.MONGODB_AUTOINDEX || false);

    return mongoose.connect(process.env.MONGODB_URL, { autoIndex })
        .then(result => {
            debug('App connected to MongoDB');
            return result.connection;
        }, error => debug(error));
}

/**
 * @returns {Promise<void>}
 */
function disconnect() {
    return mongoose.disconnect();
}

module.exports = {
    connect,
    disconnect
}