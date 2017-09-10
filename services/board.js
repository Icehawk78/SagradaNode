var _ = require('lodash');

var board = {};
var width = 5;
var height = 4;

board.initialize = function() {
    return _.times(width, (x) => {
        return _.times(height, (y) => {
            return {
                x: x,
                y: y
            };
        });
    });
};

module.exports = board;