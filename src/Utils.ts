
export class Utils {
  public static toRadians(deg : number) {
    return (deg * Math.PI) / 180;
  }

  public static distance(x0 : number,y0 : number,x1 : number,y1 : number) {
    return Math.sqrt(Math.pow(x1-x0 , 2) + Math.pow(y1-y0,2));
  }

  public static isInBound(x:number,y:number, map:Array<Array<any>>) : boolean {
    return !(x<0 || y < 0 || x >= map.length || y >= map[0].length)
  }
}