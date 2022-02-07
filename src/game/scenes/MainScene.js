import Phaser from "phaser";
import GroupPlayers from "../entity/characters/GroupPlayers";
import Player from "../entity/characters/Player";
export default class MainScene extends Phaser.Scene{
    constructor(){
        super('MainScene');
        this.paddleRightVelocity = new Phaser.Math.Vector2(0,0)
        this.privateRoom = []
    }
    init({signalR, char, data,dispatch}){
        this.signalR = signalR
        this.char = char
        this.data = data
        this.dispatch = dispatch
    }

    preload(){
        this.load.image("tiles", process.env.REACT_APP_MAPS_FOLDER + "/room2/tilesets/atlas_32x.png")
        this.load.tilemapTiledJSON("map",process.env.REACT_APP_MAPS_FOLDER + "/room2/tilemaps/map.json")
        
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

        map.createLayer("Ground", tileset, 0, 0);
        map.createLayer("Carpet", tileset, 0, 0);
        const worldLayer = map.createLayer("Collider", tileset, 0, 0);
        
        map.createLayer("BellowPlayer", tileset, 0, 0);
        const wall = map.createLayer("Wall", tileset, 0, 0);
        map.createLayer("Decoration", tileset, 0, 0);
        const abovePlayer = map.createLayer("AbovePlayer", tileset, 0, 0);
        abovePlayer.setDepth(7)
        //Add collides
        worldLayer.setCollisionByProperty({ collide: true });
        wall.setCollisionByProperty({ collide: true });
        

        //add player spawn point
        const spawnPoint = map.findObject("Objects", obj => obj.name === "SpawnPoint");

        const player = new Player(this,spawnPoint.x,spawnPoint.y,this.char.name,this.data.name,this.signalR,this.data.roomInfor);
        player.addCollider(worldLayer);
        player.addCollider(wall);

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
            console.log("Player in Room: "+room.properties.name)
            player.inRoom = room
            console.log(player?.body.touching)
        }
	}

    update() {
        this.player.update()
        this.groupPlayer.update()
        this.privateRoom.forEach(room =>{
            if(this.player.character?.self?.inRoom){
                if(this.player.character?.self?.inRoom === room  && !(this.checkOverlap(this.player.character.self,room).length > 0)){
                    //console.log("Player out Room: "+room.properties.name)
                    console.log(this.checkOverlap(this.player.character.self,room))
                    this.player.character.self.inRoom = null
                }
            }
        })
    }

    checkOverlap(object1, object2){
        let bounds1 = object1.getBounds();
        let bounds2 = object2.getBounds();
        return Phaser.Geom.Intersects.GetRectangleToRectangle(bounds1, bounds2)
    }


    
}