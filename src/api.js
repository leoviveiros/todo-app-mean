const express = require('express');
const debug = require('debug')('todo:api');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    debug(`Example app listening on port ${port}`);
});