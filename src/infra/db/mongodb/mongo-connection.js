const mongoose = require('mongoose');

/**
 * @returns {Promise<Connection>}.
 */
function connect() {
    return mongoose.connect('mongodb://localhost:27017/todo')
        .catch(console.error);
}

/**
 * @returns {Promise<void>}
 */
function disconnect() {
    return mongoose.disconnected();
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