let _ = require('lodash');
let board = require('./board');
let round = require ('./round');

const COLORS = ['blue', 'red', 'green', 'yellow', 'purple'];
// const PIPS = ['1', '2', '3', '4', '5', '6'];
let game = {};

game.initialize = function(player_count) {
    let remaining_player_colors = _.clone(COLORS);
    let players = _.times(player_count, (id) => {
        let player_color = _.sample(remaining_player_colors);
        _.pull(remaining_player_colors, player_color);
        let player_board = board.initialize(player_color);
        player_board.randomize_rules();
        return {
            id: id,
            board: player_board
        }
    });
    let rounds = _.times(10, (round_number) => {
        return round.initialize(_.map(players, 'id'), round_number);
    });
    let remaining_colors = _.flatten(_.times(4 * player_count, () => _.clone(COLORS))).sort();
    remaining_colors = rounds[0].draw_dice(remaining_colors);

    return {
        players: players,
        rounds: rounds,
        remaining_colors: remaining_colors,
        place_die: place_die,
        current_round: current_round
    };
};

function place_die(player, die, x, y) {
    let self = this;
    let round = self.current_round();
    let turn = round.current_turn();
    let board = self.players[player].board;
    if (turn != null && turn.player === player && _.includes(round.remaining_dice(), die)) {
        let placed = true;
        if (die !== -1) {
            placed = board.place_die(round.available_dice[die], x, y);
        }
        if (placed === true) {
            turn.placed_die = die;
        }
        if (self.current_round().available_dice === null) {
            self.remaining_colors = self.current_round().draw_dice(self.remaining_colors);
        }
        return placed;
    } else {
        return false;
    }
}

function current_round() {
    let self = this;
    let roundIndex = _.findLastIndex(self.rounds, 'available_dice');
    let round = self.rounds[roundIndex];
    if (round.current_turn() === null && roundIndex < self.rounds.length - 1) {
        roundIndex += 1;
    }
    return self.rounds[roundIndex];
}

module.exports = game;