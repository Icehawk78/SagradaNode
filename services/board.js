let _ = require('lodash');

let board = {};
const WIDTH = 5;
const HEIGHT = 4;
const COLORS = ['blue', 'red', 'green', 'yellow', 'purple'];
const PIPS = ['1', '2', '3', '4', '5', '6'];

board.initialize = function(private_color) {
    return {
        rows: _.times(WIDTH, (x) => {
            return _.times(HEIGHT, (y) => {
                return {
                    x: x,
                    y: y,
                    rules: {color: null, pips: null},
                    die: {color: null, pips: null}
                };
            });
        }),
        private_color: private_color,
        valid_dice: valid_dice,
        place_die: place_die,
        calculate_score: calculate_score,
        randomize_rules: randomize_rules,
        all_colors: COLORS,
        all_pips: PIPS
    };
};

function valid_dice(x, y) {
    let self = this;
    let dice = {
        colors: _.clone(COLORS),
        pips: _.clone(PIPS)
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
        x !== self.rows.length - 1 ? self.rows[x + 1][y] : null,
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
        return true;
    } else {
        return available;
    }
}

function calculate_score() {
    let self = this;
    let private_points = _(self.rows)
        .flatten()
        .filter((r) => r.die.color === self.private_color)
        .reduce((sum, cell) => sum + parseInt(cell.die.pips), 0);
    let empty_spaces = _(self.rows)
        .flatten()
        .filter(['die.color', null])
        .value()
        .length;
    return private_points - empty_spaces;
}

function randomize_rules() {
    let self = this;
    _.forEach(self.rows, (r) => {
        _.forEach(r, (cell) => {
            if (Math.random() < 0.4) {
                if (Math.random() < 0.5) {
                    cell.rules.color = _.sample(COLORS);
                } else {
                    cell.rules.pips = _.sample(PIPS);
                }
            }
        });
    });
}

module.exports = board;