const express = require('express');
const router = express.Router();

//routeHandler
router.get('/api', (req, res) => {
  res.send('This is root Page');
});

module.exports = router;
