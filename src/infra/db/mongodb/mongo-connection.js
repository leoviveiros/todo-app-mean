require('dotenv').config();

const mongoose = require('mongoose');

/**
 * @returns {Promise<Connection>}.
 */
function connect() {
    return mongoose.connect(process.env.MONGODB_URL)
        .then(result => result.connection, error => console.error(error));
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