interface CanvasProps {
  id : string;
  width : number;
  height : number;
  screenColor : string;
}

export class Canvas {
  canvasElement: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  screenColor : string;
  id : string;
  width : number;
  height : number;
  constructor(props : CanvasProps) {
    this.id = props.id;
    this.width = props.width;
    this.height = props.height;
    this.screenColor = props.screenColor;
  }

  public render() {
    this.canvasElement = document.createElement('canvas');
    this.canvasElement.setAttribute('id', this.id);
    this.canvasElement.setAttribute('width', this.width.toString());
    this.canvasElement.setAttribute('height', this.height.toString());
    this.context = this.canvasElement.getContext('2d');
    document.body.appendChild(this.canvasElement);
  }

  public clear() {
    this.drawRect(0,0,this.width,this.height,this.screenColor);
  }

  public drawRect(x : number,y : number,width : number,height : number,fillColor : string) {
    this.context.fillStyle = fillColor;
    this.context.fillRect(x,y, height, height);
  }

  public setStrokeStyle(style : string) {
    this.context.strokeStyle = style;
  }

  public drawCircle(x : number,y : number,radius : number) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI);
    this.context.closePath();
    this.context.stroke();
  }

  public drawLine(startX : number,startY : number,endX : number,endY : number) {
    this.context.beginPath();
    this.context.moveTo(startX, startY);
    this.context.lineTo( endX,endY);
    this.context.closePath();
    this.context.stroke();
  }

}