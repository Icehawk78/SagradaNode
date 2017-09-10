let express = require('express');
let router = express.Router();
let board = require('../services/board');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/board', (req, res, next) => {
  res.render('board', {board: board.initialize()});
});

module.exports = router;
