let express = require('express');
let router = express.Router();
let board = require('../services/board');

let my_board = board.initialize('blue');
my_board.randomize_rules();

router.get('/', (req, res, next) => {
    res.render('board', {title: 'Sagrada Tech Demo', board: my_board});
});

router.post('/die', (req, res, next) => {
    let response = my_board.place_die(req.body.die, parseInt(req.body.x), parseInt(req.body.y));
    console.log(my_board.calculate_score());
    res.send(response);
});

module.exports = router;