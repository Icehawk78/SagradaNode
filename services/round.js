let _ = require('lodash');
let rotate = require('rotate-array');


let round = {};
const PIPS = ['1', '2', '3', '4', '5', '6'];

round.initialize = function (players, round_number){

    rotate(players, round_number);
    let order = _.concat(players, _.reverse(_.clone(players)));
    let turns = _.map(order, (player) => {
        return {
            player: player,
            placed_die: null
        };
    });

    return {
        available_dice: null,
        turns: turns,
        draw_dice: draw_dice,
        current_turn: current_turn,
        remaining_dice: remaining_dice
    };
};

function draw_dice(game_available_colors) {
    let self = this;
    self.available_dice = _(game_available_colors)
        .sampleSize(self.turns.length + 1)
        .map((color) => {
            return {
                color: color,
                pips: _.sample(PIPS)
            };
        })
        .value();
    return diff(game_available_colors, _.map(self.available_dice, 'color'));
}

function current_turn() {
    let self = this;
    return _.find(self.turns, ['placed_die', null]) || null;
}

function remaining_dice() {
    let self = this;
    return _.concat(_.difference(_.times(self.available_dice.length), _.map(self.turns, 'placed_die')), -1);
}

function diff(arr1, arr2) {
    let res = arr1.filter((val) => {
        let found_index = arr2.indexOf(val);
        if (found_index > -1) {
            arr2.splice(found_index, 1);
            return false;
        }
        return true;
    });
    return res;
}

module.exports = round;