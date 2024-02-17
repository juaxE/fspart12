const express = require('express');
const { getAsync } = require('../redis/index.js')
const router = express.Router();

router.get('/', async (_, res) => {
    let metaData = await getAsync('added_todos')
    if (metaData === null) {
        metaData = '0'
    }
    res.send(metaData);
});

module.exports = router;