'use strict';


function mainLoop(game) {
    let result = blockDown(game, true);

    updateScreen(game);

    clearTimeout(game.timer);
    game.prevTime = Date.now();
    game.timer = setTimeout(mainLoop, game.interval, game);
}


function isOverlap(game) {
    for (let [dx, dy] of BLOCKSTAT[game.movingBlock][game.movingStat]) {
        let x = game.movingRow + dx;
        let y = game.movingCol + dy;

        if (x < 0 || x >= ROWS || y < 0 || y >= COLS) {
            return true;
        }

        if (game.map[x][y] != 0) {
            return true;
        }
    }

    return false;
}


function blockDown(game, isAuto = false) {
    game.movingRow++;

    let result = isOverlap(game);

    if (result) {
        game.movingRow--;

        if (isAuto) {
            for (let [dx, dy] of BLOCKSTAT[game.movingBlock][game.movingStat]) {
                let x = game.movingRow + dx;
                let y = game.movingCol + dy;

                game.map[x][y] = game.movingBlock;
            }

            game.holdUsed = false;

            checkMap(game);

            game.movingBlock = game.bag.pop();
            game.movingRow = 2;
            game.movingCol = 4;
            game.movingStat = 0;

            if (game.bag.length <= 7) {
                game.bag = game.bag.concat(newBag());
            }

            if (isOverlap(game)) {
                clearTimeout(game.timer);
                clearTimeout(game.leftTimer);
                clearTimeout(game.rightTimer);
                clearInterval(game.downTimer);

                game.gameOver = true;
                game.movingRow = -1;
                game.movingCol = -1;

                return false;
            }
        }

    }
    else {
        clearTimeout(game.timer);
        game.prevTime = Date.now();
        game.timer = setTimeout(mainLoop, game.interval, game);
    }

    return !result;
}


function blockLeft(game) {
    game.movingCol--;

    let result = isOverlap(game);

    if (result) {
        game.movingCol++;
    }

    if (game.leftTime != null && Date.now() - game.leftTime >= game.das) {
        game.leftTimer = setTimeout(() => {
            blockLeft(game);
            updateScreen(game);
        }, game.arr);
    }

    return !result;
}


function blockRight(game) {
    game.movingCol++;

    let result = isOverlap(game);

    if (result) {
        game.movingCol--;
    }

    if (game.rightTime != null && Date.now() - game.rightTime >= game.das) {
        game.rightTimer = setTimeout(() => {
            blockRight(game);
            updateScreen(game);
        }, game.arr);
    }

    return !result;
}


function blockRotateLeft(game) {
    let preset = game.movingBlock == 1 ? 1 : 2;
    let rotateStat = '' + game.movingStat + (game.movingStat + 3) % 4;
    game.movingStat = (game.movingStat + 3) % 4;

    for (let idx = 0; idx < 5; idx++) {
        game.movingRow += PRESET[preset][rotateStat][idx][0];
        game.movingCol += PRESET[preset][rotateStat][idx][1];

        let result = isOverlap(game);
        if (!result) {
            return true;
        }

        game.movingRow -= PRESET[preset][rotateStat][idx][0];
        game.movingCol -= PRESET[preset][rotateStat][idx][1];
    }

    game.movingStat = (game.movingStat + 1) % 4;

    return false;
}


function blockRotateRight(game) {
    let preset = game.movingBlock == 1 ? 1 : 2;
    let rotateStat = '' + game.movingStat + (game.movingStat + 1) % 4;
    game.movingStat = (game.movingStat + 1) % 4;

    for (let idx = 0; idx < 5; idx++) {
        game.movingRow += PRESET[preset][rotateStat][idx][0];
        game.movingCol += PRESET[preset][rotateStat][idx][1];

        let result = isOverlap(game);
        if (!result) {
            return true;
        }

        game.movingRow -= PRESET[preset][rotateStat][idx][0];
        game.movingCol -= PRESET[preset][rotateStat][idx][1];
    }

    game.movingStat = (game.movingStat + 3) % 4;

    return false;
}


function blockHold(game) {
    if (game.holdBlock == null) {
        game.holdBlock = game.movingBlock;

        game.movingBlock = game.bag.pop();
        game.movingRow = 2;
        game.movingCol = 4;
        game.movingStat = 0;

        if (game.bag.length <= 7) {
            game.bag = game.bag.concat(newBag());
        }
    }
    else {
        [game.holdBlock, game.movingBlock] = [game.movingBlock, game.holdBlock];
        game.movingRow = 2;
        game.movingCol = 4;
        game.movingStat = 0;
    }

    game.holdUsed = true;

    if (isOverlap(game)) {
        clearTimeout(game.timer);
        clearTimeout(game.leftTimer);
        clearTimeout(game.rightTimer);
        clearInterval(game.downTimer);

        game.gameOver = true;
        game.movingRow = -1;
        game.movingCol = -1;

        return false;
    }
}


function checkMap(game) {
    let clearLine = [];

    for (let i = 0; i < ROWS; i++) {
        let isFull = true;
        for (let j = 0; j < COLS; j++) {
            if (game.map[i][j] == 0) {
                isFull = false;
                break;
            }
        }

        if (isFull) {
            clearLine.push(i);
        }
    }

    for (let line of clearLine) {
        for (let i = line; i > 0; i--) {
            game.map[i] = game.map[i - 1].slice();
        }

        game.map[0] = new Array(COLS).fill(0);
    }
}


document.body.addEventListener('keydown', function (event) {
    if (nowGame.gameOver) {
        return;
    }

    if (event.code == 'ArrowLeft') {
        // move left

        clearTimeout(nowGame.rightTimer);
        nowGame.rightTimer = null;

        if (nowGame.leftTime != null) return;

        blockLeft(nowGame);
        nowGame.leftTime = Date.now();
        nowGame.leftTimer = setTimeout(() => {
            blockLeft(nowGame);
            updateScreen(nowGame);
        }, nowGame.das);
    }
    else if (event.code == 'ArrowRight') {
        // move right

        clearTimeout(nowGame.leftTimer);
        nowGame.leftTimer = null;

        if (nowGame.rightTime != null) return;

        nowGame.rightTime = Date.now();
        blockRight(nowGame);
        nowGame.rightTimer = setTimeout(() => {
            blockRight(nowGame);
            updateScreen(nowGame);
        }, nowGame.das);
    }
    else if (event.code == 'ArrowDown') {
        // soft drop

        if (nowGame.downTimer != null) return;

        blockDown(nowGame);
        nowGame.downTimer = setInterval(() => {
            blockDown(nowGame);
            updateScreen(nowGame);
        }, nowGame.sdf);
    }
    else if (event.code == 'Space') {
        // hard drop

        while (blockDown(nowGame)) { }
        blockDown(nowGame, true);
    }
    else if (event.code == 'KeyZ' || event.code == 'ControlLeft') {
        // rotate counter clockwise

        blockRotateLeft(nowGame);
    }
    else if (event.code == 'KeyX' || event.code == 'ArrowUp') {
        // rotate clockwise

        blockRotateRight(nowGame);
    }
    else if (event.code == 'KeyC' || event.code == 'ShiftLeft') {
        // hold

        if (!nowGame.holdUsed) blockHold(nowGame);
    }

    updateScreen(nowGame);
});


document.body.addEventListener('keyup', function (event) {
    let result;

    if (event.code == 'ArrowLeft') {
        clearTimeout(nowGame.leftTimer);
        nowGame.leftTime = null;
        nowGame.leftTImer = null;
    }
    else if (event.code == 'ArrowRight') {
        clearTimeout(nowGame.rightTimer);
        nowGame.rightTime = null;
        nowGame.rightTimer = null;
    }
    else if (event.code == 'ArrowDown') {
        clearInterval(nowGame.downTimer);
        nowGame.downTimer = null;
    }
})


nowGame.interval = 750;
nowGame.das = 165;
nowGame.arr = 33;
nowGame.sdf = 60;


nowGame.prevTime = Date.now();
nowGame.timer = setTimeout(mainLoop, nowGame.interval, nowGame);