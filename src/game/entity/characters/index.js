
import Phaser from "phaser"
import RoundRectanglePlugin from 'phaser3-rex-plugins/plugins/roundrectangle-plugin.js';
const gameConfig = {
    type: Phaser.AUTO,
    width: "100%",
    height: "100%",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        },
    },
    plugins: {
        global: [{
            key: 'rexRoundRectanglePlugin',
            plugin: RoundRectanglePlugin,
            start: true
        }]
    },
    scale: {
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    },
}
export default gameConfig