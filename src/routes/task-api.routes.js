const express = require('express');
const router = express.Router();
const debug = require('debug')('todo:task-api');

router.get('/', (req, res) => {
    debug('GET %s', req.originalUrl);
    res.send('tasks');
})

module.exports = router;