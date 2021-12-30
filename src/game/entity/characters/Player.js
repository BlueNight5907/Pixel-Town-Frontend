import Character from "./Character"
import Phaser from "phaser"
export default class Player{
    constructor(scene, x, y, character, playerName,signalR,roomInfor){
        this.scene = scene
        this.character = new Character(scene,x,y,character,playerName)
        this.signalR = signalR
        this.roomInfor = roomInfor
        
        signalR.invoke("NewUser",roomInfor.roomId,x,y)

        const { LEFT, RIGHT, UP, DOWN } = Phaser.Input.Keyboard.KeyCodes;
        this.cursors = scene.input.keyboard.addKeys({
        left: LEFT,
        right: RIGHT,
        up: UP,
        down: DOWN,
        });
        
        signalR.on("MyShortMessage", data =>{
            this.addChatBox(data.message)
        })
    }

    addChatBox(message){
        this.character.addChatBox(message)
    }

    addCollider(object,callback = null){
        this.character.addCollider(object,callback)
    }

    update(){

        const speed = 140;
        // Stop any previous movement from the last frame
        this.character.self.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.character.self.body.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.character.self.body.setVelocityX(speed);
        }
        // Vertical movement
        if (this.cursors.up.isDown) {
            this.character.self.body.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.character.self.body.setVelocityY(speed);
        }

        

        

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.character.self.body.velocity.normalize().scale(speed);

        this.character.update();

        if(this.prevState != null){
            if(this.prevState.x !== this.character.self.x || this.prevState.y !== this.character.self.y){
                this.hasStopped = false;
                const position =this.character.getPosition();
                this.signalR.invoke("Move",this.roomInfor.roomId, position.x, position.y);
            }
        }

        if(this.isStopped() && !this.sendStopRequest){
            const delayRequestStop = setTimeout(()=>{
                this.sendStopRequest = true;
                const position =this.character.getPosition();
                this.signalR.invoke("Stop",this.roomInfor.roomId, position.x, position.y);
                clearTimeout(delayRequestStop)
            },100)
        }

        this.prevState = this.character.getPosition()
    }

    isStopped(){
        if(this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown){
            this.sendStopRequest = false;
            return false
        }
        return true
    }
    
}