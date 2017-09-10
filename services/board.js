var _ = require('lodash');

var board = {};
var width = 5;
var height = 4;

board.initialize = function() {
    return {
        rows: _.times(width, (x) => {
            return _.times(height, (y) => {
                return {
                    x: x,
                    y: y,
                    rules: {color: null, number: null},
                    die: {color: null, number: null}
                };
            });
        }),
        valid_dice: valid_dice
    };
};

function valid_dice(x, y) {
    let self = this;
    return self.rows[x][y];
}


module.exports = board;