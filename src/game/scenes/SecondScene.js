import Phaser from "phaser";
import GroupPlayers from "../entity/characters/GroupPlayers";
import Player from "../entity/characters/Player";
export default class SecondScene extends Phaser.Scene{
    constructor(){
        super('SecondScene');
        this.paddleRightVelocity = new Phaser.Math.Vector2(0,0)
        this.privateRoom = []
        this.startTimeout = false
    }
    init({signalR, char, data,dispatch}){
        this.signalR = signalR
        this.char = char
        this.data = data
        this.dispatch = dispatch
    }

    preload(){
        this.load.image("tiles", process.env.REACT_APP_MAPS_FOLDER + "/room3/tilesets/atlas_32x.png")
        this.load.tilemapTiledJSON("map",process.env.REACT_APP_MAPS_FOLDER + "/room3/tilemaps/map.json")
        
    }



    destroyMessage(data,context){
        const that = context
        if(data%2 === 0){
            that.player.addChatBox("Hello 😊")
        }
        
    }


    create(){

        //set audio
        const audio = this.sound.add("cafe")
        audio.setVolume(0.1)
        audio.loop = true
        audio.play()
        //Create map
        const map = this.make.tilemap({key:"map"})
        const tileset = map.addTilesetImage("atlas_32x","tiles")

        map.createLayer("Bellow Player", tileset, 0, 0);
        map.createLayer("Middle Player", tileset, 0, 0);
        const worldLayer = map.createLayer("World", tileset, 0, 0);
        const abovePlayer = map.createLayer("Above Player", tileset, 0, 0);
        abovePlayer.setDepth(7)
        //Add collides
        worldLayer.setCollisionByProperty({ collide: true });
        

        //add player spawn point
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

        const player = new Player(this,spawnPoint.x,spawnPoint.y,this.char.name,this.data.name,this.signalR,this.data.roomInfor);
        player.addCollider(worldLayer);

        this.playerBody = player.character.self;
        this.player = player;

        
        
        // Extract PrivateRoom from the object layer
		const privateRoomLayer = map.getObjectLayer('PrivateRoom');
        console.log(privateRoomLayer)
        // Convert object layer objects to Phaser game objects
        if(privateRoomLayer && privateRoomLayer.objects){
			privateRoomLayer.objects.forEach(
				(object) => {
					let tmp = this.add.rectangle((object.x+(object.width/2)), (object.y+(object.height/2)), object.width, object.height);
					tmp.properties = object
					this.physics.world.enable(tmp, 1);
					this.player.addOverlap(tmp, this.enterRoom)
                    this.privateRoom.push(tmp)
				}
			);
		}

        

        this.groupPlayer = new GroupPlayers(this,spawnPoint, this.signalR,this.dispatch, this.data.roomInfor);
        const camera = this.cameras.main;
        camera.startFollow(this.playerBody);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        
        
    }

    enterRoom(player, room){
		if(!player.inRoom){  
            player.inRoom = room
            
            if(this.startTimeout){
                clearTimeout(this.timeout)
                this.startTimeout = false
            }
            else{
                this.isUserInRoom = true
                console.log("Player in Room: "+room.properties.name)
            }
            
        }
	}

    update() {
        this.player.update()
        this.groupPlayer.update()
        this.privateRoom.forEach(room =>{
            if(this.player.character?.self?.inRoom){
                if(this.player.character?.self?.inRoom === room  && !this.checkOverlap(this.player.character.self,room)){
                    this.startTimeout = true
                    this.timeout = setTimeout(()=>{
                        console.log("Player out Room: "+room.properties.name)
                        this.startTimeout = false
                        clearTimeout(this.timeout)
                    },2000)
                    this.player.character.self.inRoom = null
                }
            }
        })
    }

    checkOverlap = (object1, object2) => {
        let bounds1 = object1.getBounds();
        let bounds2 = object2.getBounds();
        if(Math.abs((bounds1.centerX - bounds2.centerX)) < Math.abs((bounds1.width + bounds2.width)/2)){
            if(Math.abs((bounds1.centerY - bounds2.centerY)) < Math.abs((bounds1.height + bounds2.height)/2)){
                return true
            }
        }
        return false
    }


    
}