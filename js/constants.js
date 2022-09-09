'use strict';

const ROWS = 22;
const COLS = 10;

const BLOCKSTAT = {
    1: {
        0: [[0, -1], [0, 0], [0, 1], [0, 2]],
        1: [[-1, 1], [0, 1], [1, 1], [2, 1]],
        2: [[1, -1], [1, 0], [1, 1], [1, 2]],
        3: [[-1, 0], [0, 0], [1, 0], [2, 0]],
    },
    2: {
        0: [[-1, 0], [0, 0], [-1, 1], [0, 1]],
        1: [[-1, 0], [0, 0], [-1, 1], [0, 1]],
        2: [[-1, 0], [0, 0], [-1, 1], [0, 1]],
        3: [[-1, 0], [0, 0], [-1, 1], [0, 1]],
    },
    3: {
        0: [[-1, -1], [-1, 0], [0, 0], [0, 1]],
        1: [[-1, 1], [0, 0], [0, 1], [1, 0]],
        2: [[0, -1], [0, 0], [1, 0], [1, 1]],
        3: [[-1, 0], [0, -1], [0, 0], [1, -1]],
    },
    4: {
        0: [[-1, 0], [-1, 1], [0, -1], [0, 0]],
        1: [[-1, 0], [0, 0], [0, 1], [1, 1]],
        2: [[0, 0], [0, 1], [1, -1], [1, 0]],
        3: [[-1, -1], [0, -1], [0, 0], [1, 0]],
    },
    5: {
        0: [[-1, -1], [0, -1], [0, 0], [0, 1]],
        1: [[-1, 1], [-1, 0], [0, 0], [1, 0]],
        2: [[0, -1], [0, 0], [0, 1], [1, 1]],
        3: [[1, -1], [1, 0], [0, 0], [-1, 0]],
    },
    6: {
        0: [[-1, 1], [0, -1], [0, 0], [0, 1]],
        1: [[-1, 0], [0, 0], [1, 0], [1, 1]],
        2: [[0, -1], [0, 0], [0, 1], [1, -1]],
        3: [[-1, -1], [-1, 0], [0, 0], [1, 0]],
    },
    7: {
        0: [[-1, 0], [0, -1], [0, 0], [0, 1]],
        1: [[-1, 0], [0, 0], [0, 1], [1, 0]],
        2: [[0, -1], [0, 0], [0, 1], [1, 0]],
        3: [[-1, 0], [0, -1], [0, 0], [1, 0]],
    },
};

const PRESET = {
    1: {
        '01': [[0, 0], [0, -1], [-1, -1], [2, 0], [2, -1]],
        '10': [[0, 0], [0, 1], [1, 1], [-2, 0], [-2, 1]],
        '12': [[0, 0], [0, 1], [1, 1], [-2, 0], [-2, 1]],
        '21': [[0, 0], [0, -1], [-1, -1], [2, 0], [2, -1]],
        '23': [[0, 0], [0, 1], [-1, 1], [2, 0], [2, 1]],
        '32': [[0, 0], [0, -1], [1, -1], [-2, 0], [-2, -1]],
        '30': [[0, 0], [0, -1], [1, -1], [-2, 0], [-2, -1]],
        '03': [[0, 0], [0, 1], [-1, 1], [2, 0], [2, 1]],
    },
    2: {
        '01': [[0, 0], [0, -1], [-1, -1], [2, 0], [2, -1]],
        '10': [[0, 0], [0, 1], [1, 1], [-2, 0], [-2, 1]],
        '12': [[0, 0], [0, 1], [1, 1], [-2, 0], [-2, 1]],
        '21': [[0, 0], [0, -1], [-1, -1], [2, 0], [2, -1]],
        '23': [[0, 0], [0, 1], [-1, 1], [2, 0], [2, 1]],
        '32': [[0, 0], [0, -1], [1, -1], [-2, 0], [-2, -1]],
        '30': [[0, 0], [0, -1], [1, -1], [-2, 0], [-2, -1]],
        '03': [[0, 0], [0, 1], [-1, 1], [2, 0], [2, 1]],
    }
}