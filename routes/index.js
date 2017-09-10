let express = require('express');
let router = express.Router();
let board = require('../services/board');

let my_board = board.initialize();

console.log(my_board.valid_dice(1,1));

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/board', (req, res, next) => {
  res.render('board', {board: my_board});
});

module.exports = router;
