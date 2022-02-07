import Phaser from "phaser";
import {MainScene, SecondScene} from "./SceneKeys";
import { 
    wendy,
    vision,
    timmy,
    storm,
    silver,
    phoenix,
    lora,
    logan,
    linlin,
    kirin,
    davis,
    daniel,
    chenny,
    captainAmerica,
    captain,
    misa,
    john,
    lili,
    lisa,
    nat,
    violet,
    aither } from "../constant/character";
import getCharacter from "../util/getCharacter";
export default class Preload extends Phaser.Scene{
    constructor(){
        super('Preload');
    }
    init(data){
        this.data = data;
    }
    preload(){
        //load character
        this.load.atlas(wendy.name, wendy.png, wendy.json);
        this.load.atlas(vision.name,vision.png, vision.json);
        this.load.atlas(storm.name, storm.png, storm.json);
        this.load.atlas(timmy.name,timmy.png, timmy.json);
        this.load.atlas(silver.name,silver.png, silver.json);
        this.load.atlas(phoenix.name,phoenix.png, phoenix.json);
        this.load.atlas(lora.name,lora.png, lora.json);
        this.load.atlas(logan.name, logan.png, logan.json);
        this.load.atlas(linlin.name,linlin.png, linlin.json);
        this.load.atlas(kirin.name,kirin.png, kirin.json);
        this.load.atlas(davis.name,davis.png, davis.json);
        this.load.atlas(daniel.name,daniel.png, daniel.json);
        this.load.atlas(chenny.name, chenny.png, chenny.json);
        this.load.atlas(captainAmerica.name,captainAmerica.png, captainAmerica.json);
        this.load.atlas(captain.name,captain.png, captain.json);
        this.load.atlas(violet.name,violet.png, violet.json);
        this.load.atlas(aither.name,aither.png, aither.json);
        this.load.atlas(misa.name, misa.png, misa.json);
        this.load.atlas(lili.name,lili.png, lili.json);
        this.load.atlas(lisa.name,lisa.png, lisa.json);
        this.load.atlas(nat.name,nat.png, nat.json);
        this.load.atlas(john.name,john.png, john.json);

        //load sounds
        this.load.audio("cafe", "http://localhost:3000/assets/sounds/kiss_the_rain.mp3")
    }
    create(){
        const {signalR,dispatch, data} = this.data
        const character = getCharacter(data.character)
        signalR.on("joined", (roomInfor)=>{
            const {mapId} = data;
            let Scene = MainScene;
            switch(mapId){
                case 1:{
                    Scene = MainScene;
                    break;
                }
                default:{
                    Scene = SecondScene;
                }
            }
            this.scene.start(Scene,{
                signalR:signalR,
                dispatch:dispatch,
                char:character,
                data:{
                    name:data.name,
                    ...roomInfor
                }
            });
        })
        signalR.invoke("Join",data.roomId,data.character)
        
        
    }
}