let express = require('express');
let router = express.Router();
let board = require('../services/board');

let my_board = board.initialize();
my_board.place_die({color: 'blue', pips: 3}, 1, 2);
my_board.place_die({color: 'red', pips: 2}, 2, 1);
my_board.place_die({color: 'green', pips: 6}, 3, 2);

console.log(my_board.valid_dice(2,2));

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/board', (req, res, next) => {
  res.render('board', {board: my_board});
});

module.exports = router;
