import { Player } from './Player';
import { Utils } from './Utils';
import { Canvas } from './Canvas';
import { AOV, Colors, getLength, map, PLAYER_SIZE, SCREEN_WIDTH } from './defaults';
import { Ray } from './Ray';

export class GameLoop {
  intervalId ?: NodeJS.Timeout;
  player: Player;
  canvas: Canvas;

  constructor(player: Player, canvas: Canvas) {
    this.player = player;
    this.canvas = canvas;
    this.setEventListeners();
  }

  getRayLength(angle : number) {
    return 100;
  }

  getRays() {
    const startAngle = this.player.angle - (AOV / 2);
    const numberOfRays = SCREEN_WIDTH;
    const dAngle = AOV / numberOfRays;

    return Array.from({ length: numberOfRays }, (_, idx) => {
      const rayAngle = Utils.toRadians(startAngle + idx * dAngle);
      const rayLength = this.getRayLength(rayAngle);
      return new Ray(rayAngle,rayLength);
    });
  }

  renderMap(posX = 200, posY = 0) {
    map.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        const x = posX + getLength(colIdx);
        const y = posY + getLength(rowIdx);
        this.canvas.drawRect(
          x, y,
          getLength(1), getLength(1),
          cell === 1 ? Colors.CellColor : Colors.EmptyCellColor,
        );
      });
    });
  }

  renderPlayer() {
    this.canvas.drawRect(this.player.x,this.player.y,PLAYER_SIZE,PLAYER_SIZE,Colors.PlayerColor);
    this.player.movePlayer();
  }

  renderRays() {
    const rays = this.getRays();
    const playerPosX = this.player.x;
    const playerPosY = this.player.y;
    this.canvas.setStrokeStyle("#111111");
    rays.forEach((ray) => {
              this.canvas.drawLine(
                playerPosX + PLAYER_SIZE/2,
                playerPosY + PLAYER_SIZE/2,
                playerPosX + Math.cos(ray.angle) * ray.length,
                playerPosY + Math.sin(ray.angle) * ray.length,
              );
    });
  }

  setEventListeners() {
    document.addEventListener('keydown', (ev) => {
      console.log(ev.code);

      if (ev.code === 'KeyW') {
        this.player.y -= (this.player.speed);
      }
      if (ev.code === 'KeyS') {
        this.player.y += (this.player.speed);
      }

      if (ev.code === 'KeyA') {
        this.player.x -= (this.player.speed);
      }
      if (ev.code === 'KeyD') {
        this.player.x += (this.player.speed);
      }


      if (ev.code === 'KeyX') {
        this.player.speed = 4;
      }
    });

    document.addEventListener('keyup', (ev) => {
      if (ev.code === 'KeyX') {
        this.player.speed = 0;
      }
    });

    document.addEventListener('mousemove', (e) => {
      this.player.angle += Utils.toRadians(e.movementX * 10);
    });
  }

  public run(fps: number) {
    this.canvas.render();
    this.intervalId = setInterval(() => this.render(), 1000 / fps);
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    this.canvas.clear();
    this.renderMap();
    this.renderPlayer();
    this.renderRays();
  }

}