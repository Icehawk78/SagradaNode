let _ = require('lodash');

let board = {};
const width = 5;
const height = 4;
const colors = ['blue', 'red', 'green', 'yellow', 'purple'];
const pips = [1, 2, 3, 4, 5, 6];

board.initialize = function() {
    return {
        rows: _.times(width, (x) => {
            return _.times(height, (y) => {
                return {
                    x: x,
                    y: y,
                    rules: {color: null, pips: null},
                    die: {color: null, pips: null}
                };
            });
        }),
        valid_dice: valid_dice
    };
};

function valid_dice(x, y) {
    let self = this;
    let dice = {
        colors: _.clone(colors),
        pips: _.clone(pips)
    };
    let cell = self.rows[x][y];
    if (cell.die.color !== null) {
        dice = {
            colors: [],
            pips: []
        };
    } else if (cell.rules.color !== null) {
        dice.colors = [cell.rules.color];
    } else if (cell.rules.pips !== null) {
        dice.pips = [cell.rules.pips];
    }
    return dice;
}


module.exports = board;