const debug = require('debug')('todo:app');
const mongo = require('./infra/db/mongodb/mongo-connection.js');
const ApiServer = require('./infra/http/api.js');

async function startApp() {
    debug('Starting app...');
    await mongo.connect();
    ApiServer.start();
}

process.on('SIGTERM', async () => {
    debug('SIGTERM signal received: stoping app')

    await ApiServer.stop();
    await mongo.disconnect();
});

startApp();