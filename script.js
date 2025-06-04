const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const grid = 20;
let snake = [{ x: 160, y: 160 }];
let dx = grid;
let dy = 0;
let food = randomFood();
let gameOver = false;

function randomFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
    y: Math.floor(Math.random() * (canvas.height / grid)) * grid
  };
}

function gameLoop() {
  if (gameOver) return;

  setTimeout(() => {
    requestAnimationFrame(gameLoop);

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (
      head.x < 0 ||
      head.x >= canvas.width ||
      head.y < 0 ||
      head.y >= canvas.height
    ) {
      return endGame();
    }

    for (let segment of snake) {
      if (head.x === segment.x && head.y === segment.y) {
        return endGame();
      }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      food = randomFood();
    } else {
      snake.pop();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'lime';
    for (let segment of snake) {
      ctx.fillRect(segment.x, segment.y, grid - 1, grid - 1);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, grid - 1, grid - 1);
  }, 100);
}

function endGame() {
  gameOver = true;
  alert('Game Over!');
  location.reload();
}

function changeDirection(newDx, newDy) {
  if ((newDy !== 0 && dy === 0) || (newDx !== 0 && dx === 0)) {
    dx = newDx;
    dy = newDy;
  }
}

document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowUp':
      changeDirection(0, -grid);
      break;
    case 'ArrowDown':
      changeDirection(0, grid);
      break;
    case 'ArrowLeft':
      changeDirection(-grid, 0);
      break;
    case 'ArrowRight':
      changeDirection(grid, 0);
      break;
  }
});

// Adiciona suporte para botões touch
document.getElementById('btnUp').addEventListener('click', () => changeDirection(0, -grid));
document.getElementById('btnDown').addEventListener('click', () => changeDirection(0, grid));
document.getElementById('btnLeft').addEventListener('click', () => changeDirection(-grid, 0));
document.getElementById('btnRight').addEventListener('click', () => changeDirection(grid, 0));

requestAnimationFrame(gameLoop);
