let express = require('express');
let router = express.Router();
let board = require('../services/board');
let game = require('../services/game');

let my_board = board.initialize('blue');
my_board.randomize_rules();

let my_game = game.initialize(2);

//
// console.log(my_game.place_die(1, 1, 1, 1));
// console.log(my_game.place_die(0, 1, 1, 1));
// console.log(my_game.place_die(1, 1, 1, 1));
// console.log(my_game.place_die(1, 2, 1, 1));
// console.log(my_game.current_round().current_turn());

// router.get('/', (req, res, next) => {
//     res.render('board', {title: 'Sagrada Tech Demo', board: my_board});
// });
//
// router.post('/die', (req, res, next) => {
//     let response = my_board.place_die(req.body.die, parseInt(req.body.x), parseInt(req.body.y));
//     console.log(my_board.calculate_score());
//     res.send(response);
// });

router.get('/json', (req, res, next) => {
    console.log(my_game);
    res.send(my_game);
});

router.get('/:playerId', (req, res, next) => {
    let id = parseInt(req.params.playerId);
    let my_turn = my_game.current_round().current_turn() !== null && my_game.current_round().current_turn().player === id;
    if (my_game.players.length < id) {
        res.send(false);
    } else {
        res.render('board', {
            title: 'Sagrada Tech Demo, Player #' + id,
            board: my_game.players[id].board,
            available_dice: my_game.current_round().available_dice,
            remaining_dice: my_game.current_round().remaining_dice(),
            my_turn: my_turn,
            player_id: id
        });
    }
});

router.post('/:playerId/die', (req, res, next) => {
    let id = parseInt(req.params.playerId);
    let die = parseInt(req.body.die);
    let x = parseInt(req.body.x);
    let y = parseInt(req.body.y);
    if (my_game.players.length < id) {
        res.send(false);
    } else {
        let response = my_game.place_die(id, die, x, y);
        console.log('Player', id, 'Score:', my_game.players[id].board.calculate_score());
        res.send(response);
    }
});

module.exports = router;