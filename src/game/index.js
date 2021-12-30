import React, { Fragment } from 'react'
import gameConfig from './gameConfig'
import Phaser from "phaser"
import MainScene from './scenes/MainScene'
import Preload from './scenes/Preload';

function resize(game,container){
  if(!container) return;
  const size = {        
    width : container.clientWidth,        
    height : container.clientHeight    
  };
  game.scale.setGameSize(size.width, size.height);
  game.renderer.resize(size.width, size.height); 
}

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.gameContainer = React.createRef();
        this.doResize = null;
        this.game = null;
    }
    componentDidMount() {
      if(this.props.signalR === null)
        return
      const config = {
        ...gameConfig,
        parent: this.gameContainer.current,
        scene: [Preload,MainScene],
      };
      const game = new Phaser.Game(config);
      this.doResize = ()=> resize(game,this.gameContainer.current)
      window.addEventListener('resize',this.doResize)
      game.scene.start('Preload',{signalR:this.props.signalR,data:this.props.data,setRoomId:this.props.setRoomId});
      this.game = game;
    }
    componentDidUpdate(){
      if(this.props.signalR === null)
        return
      const config = {
        ...gameConfig,
        parent: this.gameContainer.current,
        scene: [Preload,MainScene],
      };
      const game = new Phaser.Game(config);
      this.doResize = ()=> resize(game,this.gameContainer.current)
      window.addEventListener('resize',this.doResize)
      game.scene.start('Preload',{signalR:this.props.signalR,data:this.props.data,setRoomId:this.props.setRoomId});
      this.game = game;
    }
    shouldComponentUpdate() {
      if(this.props.signalR === null)
        return true
      else
        return false
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.doResize)
        if(this.game){
          this.game.destroy();
        }
        this.props.signalR.off("Joined");
        this.props.signalR.off("MyShortMessage");
        this.props.signalR.off("AllPlayer");
        this.props.signalR.off("NewUserEntry");
        this.props.signalR.off("UserOut");
        this.props.signalR.off("UserMoving");
        this.props.signalR.off("UserStop");
        this.props.signalR.off("UserSendShortMessage");
    }

    render() {
      return(
        <Fragment>
          <div ref={this.gameContainer} id="phaser-game"/>
        </Fragment>
      ) 
    }
  }
  
