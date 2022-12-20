require('dotenv').config();
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

/**
 * @returns boolean
 */
async function isConnected() {
    let connected = mongoose.connection.readyState === 1;

    if (!connected) {
        await new Promise(resolve => setTimeout(resolve, 500));

        connected = mongoose.connection.readyState === 1;
    }

    return connected;
}

module.exports = {
    connect,
    disconnect,
    isConnected,
}