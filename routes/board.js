let express = require('express');
let router = express.Router();
let board = require('../services/board');
let game = require('../services/game');

let my_board = board.initialize('blue');
my_board.randomize_rules();

let my_game = game.initialize(2);

router.get('/', (req, res, next) => {
    res.render('board', {title: 'Sagrada Tech Demo', board: my_board});
});

router.post('/die', (req, res, next) => {
    let response = my_board.place_die(req.body.die, parseInt(req.body.x), parseInt(req.body.y));
    console.log(my_board.calculate_score());
    res.send(response);
});

router.get('/game', (req, res, next) => {
    console.log(my_game);
    res.send(my_game);
});

router.get('/:playerId', (req, res, next) => {
    let id = parseInt(req.params.playerId);
    if (my_game.players.length < id) {
        res.send(false);
    } else {
        res.render('board', {title: 'Sagrada Tech Demo, Player #' + id, board: my_game.players[id].board});
    }
});

module.exports = router;