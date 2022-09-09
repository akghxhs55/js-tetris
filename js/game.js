'use strict';


function mainLoop(game) {
    let result = blockDownAuto(game);

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


function blockDownAuto(game) {
    game.movingRow++;

    let result = isOverlap(game);

    if (result) {
        game.movingRow--;

        for (let [dx, dy] of BLOCKSTAT[game.movingBlock][game.movingStat]) {
            let x = game.movingRow + dx;
            let y = game.movingCol + dy;

            game.map[x][y] = game.movingBlock;
        }

        game.movingBlock = game.bag.pop();
        game.movingRow = 2;
        game.movingCol = 4;
        game.movingStat = 0;

        if (game.bag.length <= 7) {
            game.bag = game.bag.concat(newBag());
        }

        clearTimeout(game.timer);
        game.prevTime = Date.now();
        game.timer = setTimeout(mainLoop, game.interval, game);
    }

    return !result;
}


function blockDown(game, isHard = false) {
    game.movingRow++;

    let result = isOverlap(game);

    if (result) {
        game.movingRow--;
    }

    return !result;
}


function blockLeft(game) {
    game.movingCol--;

    let result = isOverlap(game);

    if (result) {
        game.movingCol++;
    }

    return !result;
}


function blockRight(game) {
    game.movingCol++;

    let result = isOverlap(game);

    if (result) {
        game.movingCol--;
    }

    return !result;
}


function blockRotateLeft(game) {
    game.movingStat = (game.movingStat + 3) % 4;

    let result = isOverlap(game);

    if (result) {
        game.movingStat = (game.movingStat + 1) % 4;
    }

    return !result;
}


function blockRotateRight(game) {
    game.movingStat = (game.movingStat + 1) % 4;

    let result = isOverlap(game);

    if (result) {
        game.movingStat = (game.movingStat + 3) % 4;
    }

    return !result;
}


document.body.addEventListener('keydown', function (event) {
    let result;

    if (event.code == 'ArrowLeft') {
        // move left

        result = blockLeft(nowGame);
    }
    else if (event.code == 'ArrowRight') {
        // move right

        result = blockRight(nowGame);
    }
    else if (event.code == 'ArrowDown') {
        // soft drop

        result = blockDown(nowGame);
    }
    else if (event.code == 'Space') {
        // hard drop

        while (blockDown(nowGame, true)) { }
        result = blockDownAuto(nowGame);
    }
    else if (event.code == 'KeyZ' || event.code == 'ControlLeft') {
        // rotate counter clockwise

        result = blockRotateLeft(nowGame);
    }
    else if (event.code == 'KeyX' || event.code == 'ArrowUp') {
        // rotate clockwise

        result = blockRotateRight(nowGame);
    }

    if (result) {
        clearTimeout(nowGame.timer);
        nowGame.prevTime = Date.now();
        nowGame.timer = setTimeout(mainLoop, nowGame.interval, nowGame);
    }

    updateScreen(nowGame);
});



nowGame.interval = 1000;
nowGame.minInterval = 400;


nowGame.prevTime = Date.now();
nowGame.timer = setTimeout(mainLoop, nowGame.interval, nowGame);