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
        draw_dice: draw_dice
    };
};

function draw_dice(game_available_colors) {
    let self = this;
    let round_colors = _.sampleSize(game_available_colors, self.turns.length + 1);
    let round_available_dice = _.map(round_colors, (color) => {
        return {
            color: color,
            pips: _.sample(PIPS)
        };
    });
    console.log(round_available_dice);
    return _.difference(game_available_colors, round_colors);
}

module.exports = round;