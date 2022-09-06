'use strict';

const ROWS = 20;
const COLS = 10;

const interval = 1200;

const blockStat = {
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