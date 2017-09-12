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
        valid_dice: valid_dice,
        place_die: place_die
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
    let neighbors = _.compact([
        x !== 0 ? self.rows[x - 1][y] : null,
        x !== self.rows.length ? self.rows[x + 1][y] : null,
        y !== 0 ? self.rows[x][y - 1] : null,
        y !== self.rows[x].length ? self.rows[x][y + 1] : null
    ]);
    let neighbor_colors = _.map(neighbors, 'die.color');
    let neighbor_pips = _.map(neighbors, 'die.pips');
    dice.colors = _.difference(dice.colors, neighbor_colors);
    dice.pips = _.difference(dice.pips, neighbor_pips);
    return dice;
}

function place_die(die, x, y) {
    let self = this;
    let available = self.valid_dice(x, y);
    if (_(available.colors).includes(die.color) && _(available.pips).includes(die.pips)) {
        self.rows[x][y].die = die;
    } else {
        console.log(available);
    }
}

module.exports = board;