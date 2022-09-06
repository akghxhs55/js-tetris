'use strict';


function mainLoop(game) {
    let result = blockDownAuto(game);
    
    updateScreen(game);

    clearTimeout(game.timer);
    game.prevTime = Date.now();
    game.timer = setTimeout(mainLoop, interval, game);
}


function gameOver(game) {
    alert('Game Over!');
    clearTimeout(game.timer);
}


function isOverlap(game) {
    for (let [dx, dy] of blockStat[game.movingBlock][game.movingStat]) {
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

        for (let [dx, dy] of blockStat[game.movingBlock][game.movingStat]) {
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
        game.timer = setTimeout(mainLoop, interval, game);
    }

    return !result;
}


function blockDown(game, isHard = false) {
    if (Date.now() - game.prevTime < errInterval) {
        return false;
    }

    game.movingRow++;

    let result = isOverlap(game);

    if (result) {
        game.movingRow--;
    }
    else {
        if (!isHard && interval - (Date.now() - game.prevTime) < minInterval) {
            clearTimeout(game.timer);
            game.prevTime = Date.now();
            game.timer = setTimeout(mainLoop, minInterval, game);
        }
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


document.body.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowLeft') {
        // move left

        blockLeft(nowGame);
    }
    else if (event.code == 'ArrowRight') {
        // move right

        blockRight(nowGame);
    }
    else if (event.code == 'ArrowDown') {
        // soft drop

        blockDown(nowGame);
    }
    else if (event.code == 'Space') {
        // hard drop

        while (blockDown(nowGame, true)) {}
        blockDownAuto(nowGame);
    }
    else if (event.code == 'KeyZ' || event.code == 'ControlLeft') {
        // rotate counter clockwise
        
        blockRotateLeft(nowGame);
    }
    else if (event.code == 'KeyX' || event.code == 'ArrowUp') {
        // rotate clockwise

        blockRotateRight(nowGame);
    }

    updateScreen(nowGame);
});



game.prevTime = Date.now();
game.timer = setTimeout(mainLoop, 1000, nowGame);