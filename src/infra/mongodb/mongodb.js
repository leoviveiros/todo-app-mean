const debug = require('debug')('todo:mongodb');
const mongoose = require('mongoose');

class MongoDB {

    static {
        mongoose.set('strictQuery', false);
    }

    /**
     * @returns {Promise<Connection>}.
     */
    static connect() {
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
    static disconnect() {
        return mongoose.disconnect();
    }

}

module.exports = MongoDB;