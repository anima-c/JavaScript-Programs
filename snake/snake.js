// snake队列表示蛇身，初始节点存在但不显示
var snake = [41, 40],
    // 1表示向右，-1表示向左，20表示向下，-20表示向上
    direction = 1,
    // 食物的位置
    food = 43,
    // 与下次移动的位置有关
    n,
    // 从0到399表示box里[0~19]*[0~19]的所有节点，每20px一个节点
    box = document.getElementById('can').getContext('2d');

function draw(seat, color) {
    box.fillStyle = color;
    // 用color填充一个矩形，以前两个参数为x，y坐标，后两个参数为宽和高
    box.fillRect(seat % 20 * 20 + 1, ~~(seat / 20) * 20 + 1, 18, 18);
}

document.onkeydown = function (evt) {
    // 当键盘上下左右件摁下的时候改变direction
    direction = snake[1] - snake[0] == (n = [-1, -20, 1, 20][(evt || event).keyCode - 37] || direction) ? direction : n;
};

! function () {
    // 此时的n为下次蛇头出现的位置，n进入队列
    snake.unshift(n = snake[0] + direction);
    // 语句判断贪吃蛇是否撞到自己活着墙壁，碰到时返回，结束进程
    if (snake.indexOf(n, 1) > 0 || n < 0 || n > 399 || direction == 1 && n % 20 == 0 || direction == -1 && n % 20 == 19) {
        return alert('GAME OVER!');
    }
    // 画蛇头下次出现的位置
    draw(n, 'lime');
    // 如果吃到食物时，产生一个蛇身以外的随机点，不会去掉蛇尾
    if (n == food) {
        while (snake.indexOf(food = ~~(Math.random() * 400)) >= 0);
        draw(food, 'yellow');
    } else {
        // 没有吃到食物时正常移动，蛇尾出队列
        draw(snake.pop(), 'black');
    }

    setTimeout(arguments.callee, 150);
}();