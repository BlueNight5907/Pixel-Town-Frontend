import Phaser from "phaser";
import {MainScene} from "./SceneKeys";
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
    }
    create(){
        const {signalR, data} = this.data
        let random = Math.floor(Math.random() * 14)
        let char = getCharacter("nat")
        switch(random){
            case 0:
                char = getCharacter("misa")
                break
            case 1:
                char = getCharacter("john")
                break
            case 2:
                char = getCharacter("lisa")
                break
            case 3:
                char = getCharacter("nat")
                break
            case 4:
                char = getCharacter("phoenix")
                break
            case 5:
                char = getCharacter("logan")
                break
            case 6:
                char = getCharacter("timmy")
                break
            case 7:
                char = getCharacter("violet")
                break
            case 8:
                char = getCharacter("aither")
                break
            case 9:
                char = getCharacter("linlin")
                break
            case 10:
                char = getCharacter("cenny")
                break
            case 11:
                char = getCharacter("lora")
                break
            case 12:
                char = getCharacter("captain")
                break
            case 13:
                    char = getCharacter("kirin")
                    break
            default:
                char = getCharacter("lili")
        }
        signalR.invoke("Join",data.roomId,data.name,char.name)
        signalR.on("joined", (roomInfor)=>{
            this.scene.start(MainScene,{
                signalR:this.data.signalR,
                char:char,
                data:{
                    name:this.data.data.name,
                    ...roomInfor
                }
            });
        })
        
    }
}