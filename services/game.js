let _ = require('lodash');
let board = require('./board');

const COLORS = ['blue', 'red', 'green', 'yellow', 'purple'];
// const PIPS = ['1', '2', '3', '4', '5', '6'];
let game = {};

game.initialize = function(player_count) {
    let remaining_colors = _.clone(COLORS);
    return {
        players: _.times(player_count, (id) => {
            let player_color = _.sample(remaining_colors);
            _.pull(remaining_colors, player_color);
            console.log(remaining_colors);
            let player_board = board.initialize(player_color);
            player_board.randomize_rules();
            return {
                id: id,
                board: player_board
            }
        }),
        all_dice: _.flatten(_.times(4 * player_count, () => _.clone(COLORS)))
    };
};

module.exports = game;