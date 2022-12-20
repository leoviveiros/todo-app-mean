const express = require('express');
const debug = require('debug')('todo:api');
const taskApiRoutes = require('./routes/task-api.routes.js');

class ApiServer {
    static httpServer;

    static start() {
        const app = express();
        const port = 3000;

        app.use(express.json())
        app.use('/api/tasks', taskApiRoutes);

        app.get('/', (req, res) => {
            res.send('TODO App!')
        });

        this.httpServer = app.listen(port, () => {
            debug(`App listening on port ${port}`);
        });
    }

    static stop() {
        return new Promise(resolve => {
            server.close(() => {
                debug('HTTP server closed');
                resolve();
            });
        });    
    }
}

module.exports = ApiServer;