const express = require('express');
const { getAsync } = require('../redis/index.js')
const router = express.Router();

router.get('/', async (_, res) => {
    const metaData = await getAsync('added_todos')
    res.send(metaData);
  });

  module.exports = router;