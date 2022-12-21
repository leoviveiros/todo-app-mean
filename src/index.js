require('dotenv').config();

const debug = require('debug')('todo:app');
const MongoDB = require('./infra/mongodb/mongodb.js');
const ApiServer = require('./infra/http/api.js');

async function startApp() {
    debug('Starting app...');
    await MongoDB.connect();
    ApiServer.start();
}

process.on('SIGTERM', async () => {
    debug('SIGTERM signal received: stoping app')

    await ApiServer.stop();
    await MongoDB.disconnect();
});

startApp();