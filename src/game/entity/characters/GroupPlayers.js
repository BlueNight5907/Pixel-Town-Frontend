import { getAllPeople } from "../../../stores/actions/JoinRoom"
import getCharacter from "../../util/getCharacter"
import Character from "./Character"

export default class GroupPlayers{
    constructor(scene,spawPoint,signalR,dispatch, roomInfor){
        this.scene = scene
        this.sceneGroup = this.scene.add.group()
        this.group = {}
        this.signalR = signalR
        this.dispatch = dispatch
        signalR.on("AllPlayer", (data)=>{
            data.users.forEach(user => {

                if(user.signalrID === signalR.connectionId) return;
                const {character,name,position,signalrID} = user

                let x = spawPoint.x
                let y = spawPoint.y

                if(position){
                    x = position.x
                    y = position.y
                }

                const newUser = new Character(this.scene,x,y,getCharacter(character).name,name,signalrID)
                this.add(newUser)
            })
        })

        signalR.on("NewUserEntry", (user)=>{
            if(user.signalrID === signalR.connectionId) return;
            console.log(roomInfor)
            dispatch(getAllPeople(roomInfor.roomId))
            const {character,name,position,signalrID} = user

            let x = spawPoint.x
            let y = spawPoint.y

            if(position){
                x = position.x
                y = position.y
            }

            const newUser = new Character(this.scene,x,y,getCharacter(character).name,name,signalrID)
            this.add(newUser)
        })
        signalR.on("UserOut",data =>{
            dispatch(getAllPeople(roomInfor.roomId))
            const user = this.group[data.signalrID]
            this.remove(user)
        })

        signalR.on("UserMoving", data =>{ 
            let ping = new Date().getTime() - data.time
            console.log("ping: "+ping)
            const user = this.group[data.signalrID]
            user.setUpdate({...data.position,hasStopped:false})
            user.update(true)
        })

        signalR.on("UserStop", data =>{ 
            let ping = new Date().getTime() - data.time
            console.log("ping: "+ping)
            const user = this.group[data.signalrID]
            user.setUpdate({...data.position,hasStopped:true})
            user.update(true)
        })

        signalR.on("UserSendShortMessage",(data)=>{
            const user = this.group[data.signalrID]
            user?.addChatBox(data.message)
        })
        signalR.invoke("GetAllPlayer",roomInfor.roomId)
    }

    add(character){
        this.group[character.signalrID] = character
        this.sceneGroup.add(character.self)
    }

    remove(character){
        character?.self.destroy()
        delete this.group[character.signalrID]
    }


    update(){
        Object.values(this.group).forEach(player => {
            player.playAnim();
        })
    }
}