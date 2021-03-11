import './defaults';
import { Utils } from './Utils';
import { getLength, map } from './defaults';

interface NeighbourType {
  x0: number,
  y0: number,
  x1: number,
  y1: number
}

export class Player {
  public x: number = getLength(1) * 10;
  public y: number = getLength(1) * 4;
  public angle: number = 0;
  public speed: number = 0;

  public movePlayer() {
    const angle = Utils.toRadians(this.angle);
    let newX = this.x + Math.cos(angle) * (this.speed);
    let newY = this.y + Math.sin(angle) * (this.speed);

    let nCells = this.getNeighbours(this.x, this.y);
    let isCollision = false;

    nCells.forEach((cell) => {
      if (isCollision) return;
      let row = cell.y0 / getLength(1);
      let col = cell.x0 / getLength(1);
      console.log(row, col, map[row][col]);
      if (!Utils.isInBound(row, col, map)) return;
      if ((map[row][col] === 1) && this.fallInCell(cell, newX, newY)) {
        isCollision = true;
      }
    });

    if (!isCollision) {
      this.x = newX;
      this.y = newY;
    }
  }

  fallInCell(cell: NeighbourType, newX: number, newY: number): boolean {
    return (cell.x0 <= newX && cell.x1 >= newX) && (cell.y0 <= newY && cell.y1 >= newY);
  }

  getNeighbours(x: number, y: number): NeighbourType[] {
    const unitLength = getLength(1);
    let currentX = (Math.floor(x / unitLength)) * unitLength;
    let currentY = (Math.floor(y / unitLength)) * unitLength;
    let leftX = (Math.floor(x / unitLength) - 1) * unitLength;
    let rightX = Math.ceil(x / unitLength) * unitLength;
    let topY = (Math.floor(y / unitLength) - 1) * unitLength;
    let bottomY = Math.ceil(y / unitLength) * unitLength;

    return [
      { x0: leftX, x1: leftX + unitLength, y0: currentY, y1: currentY + unitLength },
      { x0: rightX, x1: rightX + unitLength, y0: currentY, y1: currentY + unitLength },
      { x0: currentX, x1: currentX + unitLength, y0: topY, y1: topY + unitLength },
      { x0: currentX, x1: currentX + unitLength, y0: bottomY, y1: bottomY + unitLength },
    ];
  };

}