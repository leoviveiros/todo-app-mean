const express = require('express');
const debug = require('debug')('todo:api');
const taskApiRoutes = require('./routes/task-api.routes.js');
const app = express();
const port = 3000;

app.use('/api/tasks', taskApiRoutes);

app.get('/', (req, res) => {
    res.send('TODO App!')
});

app.listen(port, () => {
    debug(`App listening on port ${port}`);
});