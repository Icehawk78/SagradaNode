let express = require('express');
let router = express.Router();
let board = require('../services/board');

let my_board = board.initialize();
my_board.place_die({color: 'blue', pips: 3}, 1, 2);
my_board.place_die({color: 'red', pips: 2}, 2, 1);
my_board.place_die({color: 'green', pips: 6}, 3, 2);

console.log(my_board.valid_dice(2,2));

router.get('/', (req, res, next) => {
    console.log(my_board);
    res.render('board', {title: 'Sagrada Tech Demo', board: my_board});
});

router.post('/die', (req, res, next) => {
    console.log(req.body);
    let response = my_board.place_die(req.body.die, parseInt(req.body.x), parseInt(req.body.y));
    console.log(response);
    res.send(response);
});

module.exports = router;