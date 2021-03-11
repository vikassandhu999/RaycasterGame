import "./styles.css";

import { GameLoop } from './GameLoop';
import { Canvas } from './Canvas';
import { Player } from './Player';
import { Colors } from './defaults';

const canvas = new Canvas({
    id : "mainCanvas" ,
    width : window.innerWidth,
    height : window.innerHeight,
    screenColor : Colors.ScreenColor
});

const player = new Player();

const gameLoop = new GameLoop(player,canvas);

window.addEventListener("load", () => {
    gameLoop.run(60);
    // gameLoop.stop();
})