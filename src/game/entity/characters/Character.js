
export default class Character {
    constructor(scene, x, y, characterName,name, signalrID = null){
        this.scene = scene;
        this.character = characterName;
        this.prevState = null;
        this.signalrID = signalrID;
        this.destroyTimeout = null;
        const anims = scene.anims;
        this.body = scene.physics.add.sprite(
            0,0,
            characterName,
            characterName+"-front"
        )
        .setOrigin(0.5,0.75);
        this.createCharAnims(anims);
        
        //Add displayName
        this.characterName = scene.add.text(2,0,name,{
            font:"12px Arial",
            fill:"#ffffff",
            stroke:"#000000",
            strokeThickness:4,
            padding:{
                x:5,
                y:0
            }
        }).setOrigin(0.5, 0.5);

        const textWidth = this.characterName.width;
        const circle = scene.add.circle(-textWidth/2, 1, 4, 0x00b035).setStrokeStyle(1, 0x000000).setOrigin(0.5,0.5);
        
        this.bodyHeight = this.body.height;
        const state_container = scene.add.container(0,-(this.bodyHeight/2 + 18),[this.characterName,circle]).setSize(128,20).setDepth(2)
        
        this.bounds = scene.add.container(0,0).setSize(128,64);
        this.bounds.add(this.body)
        this.bounds.add(state_container)
        //add char with container
        this.self = scene.add.container(x,y);
        this.self.setSize(30, 30);
        this.self.add(this.bounds);
        
        this.scene.physics.world.enable(this.self);
    
        
        
    }

    addChatBox(message){
        this.destroyChatBox();
        var textStyle = {
            font: "normal 12px Arial",
            fill: '#000000',
            align: 'center',
            boundsAlignH: "center", // bounds center align horizontally
            boundsAlignV: "middle",// bounds center align vertically
            padding:{x:5,y:5},
            wordWrap:{width:140}

        };
        const textElement = this.scene.add.text(0,0,message,textStyle).setOrigin(0.5,0.5).setDepth(31);
        //  32px radius on the corners
        const rec = this.scene.add.rexRoundRectangle(0, 0, 150, 50,5,0xffffff);
        this.messageBox = this.scene.add.container(this.self.x,this.self.y - (this.bodyHeight/2 + 50),[rec,textElement]).setSize(150,100);
        this.messageBox.setDepth(12)
        this.messageBox.alpha = 0;
        this.scene.tweens.add({
            targets: this.messageBox,
            alpha: 1,
            yoyo: false,
            repeat: 0,
            ease: 'Sine.easeInOut',
            duration:600
        });
        this.scene.physics.world.enable(this.messageBox);
        this.destroyTimeout = setTimeout(()=>{if(this.messageBox) this.destroyChatBox()},4000)

    }

    destroyChatBox(){
        if(this.messageBox){
            this.messageBox.destroy();
            clearTimeout(this.destroyTimeout);
            this.destroyTimeout = null;
        }
    }
    
    addCollider(object,callback){
        this.scene.physics.add.collider(this.self,object,callback)
    }
    createCharAnims(anims){
        //walk left
        anims.create({
            key: this.character + "-left-walk",
            frames: anims.generateFrameNames(this.character , {
            prefix: this.character + "-left-walk.",
            start: 0,
            end: 3,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        })

         //walk right
         anims.create({
            key: this.character + "-right-walk",
            frames: anims.generateFrameNames(this.character , {
            prefix: this.character + "-right-walk.",
            start: 0,
            end: 3,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        })

         //walk front
         anims.create({
            key: this.character + "-front-walk",
            frames: anims.generateFrameNames(this.character , {
            prefix: this.character + "-front-walk.",
            start: 0,
            end: 3,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        })

         //walk back
         anims.create({
            key: this.character + "-back-walk",
            frames: anims.generateFrameNames(this.character , {
            prefix: this.character + "-back-walk.",
            start: 0,
            end: 3,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        })
    }

    setUpdate(updates){
        this.updates = updates
    }

    physicUpdate() {
        if(this.messageBox){
            this.messageBox.x = this.self.x;
            this.messageBox.y = this.self.y - (this.bodyHeight/2 + 50);
        }
        const prevVelocity = this.self.body.velocity.clone();
        // Update the animation last and give left/right animations precedence over up/down animations
        if (this.self.body.velocity.x < 0) {
            this.body.anims.play(this.character + "-left-walk", true);
        } else if (this.self.body.velocity.x > 0) {
            this.body.anims.play(this.character + "-right-walk", true);
        } else if (this.self.body.velocity.y < 0) {
            this.body.anims.play(this.character + "-back-walk", true);
        } else if (this.self.body.velocity.y > 0) {
            this.body.anims.play(this.character + "-front-walk", true);
        } else {
            this.body.anims.stop();
            // If we were moving, pick and idle frame to use
            if (prevVelocity.x < 0) this.body.setTexture(this.character, this.character + "-left");
            else if (prevVelocity.x > 0) this.body.setTexture(this.character, this.character + "-right");
            else if (prevVelocity.y < 0) this.body.setTexture(this.character, this.character + "-back");
            else if (prevVelocity.y > 0) this.body.setTexture(this.character, this.character + "-front");        
        }
    }

    forcedUpdate(){
        this.prevState = {
            x: this.self.x,
            y: this.self.y
        }
        this.self.setPosition(this.updates.x,this.updates.y)
        if(this.messageBox){
            this.messageBox.x = this.self.x;
            this.messageBox.y = this.self.y - 65;
        }
    }

    getPosition(){
        return {
            x:this.self.x,
            y:this.self.y
        }
        
    }


    update(force = false){
        if(force){
            this.forcedUpdate();
        }
        else{
            this.physicUpdate();
        }
    }

    playAnim(){
        if(!this.prevState) return;
        if(this.messageBox){
            this.messageBox.x = this.updates.x;
            this.messageBox.y = this.updates.y - (this.bodyHeight/2 + 50);
        }
        if(!this.updates.hasStopped){
            let moveHor = this.self.x - this.prevState.x
            let moveVer = this.self.y - this.prevState.y
            // Update the animation last and give left/right animations precedence over up/down animations
            if (moveHor < 0) {
                this.body.anims.play(this.character + "-left-walk", true);
            } else if (moveHor > 0) {
                this.body.anims.play(this.character + "-right-walk", true);
            } else if (moveVer < 0) {
                this.body.anims.play(this.character + "-back-walk", true);
            } else if (moveVer > 0) {
                this.body.anims.play(this.character + "-front-walk", true);
            }else{
                this.body.anims.stop();
            }
        }
        else{
            // If we were moving, pick and idle frame to use
            switch(this.body.anims.currentAnim?.key){
                case this.character + "-left-walk":
                    this.body.setTexture(this.character, this.character + "-left");
                    this.body.anims.stop();
                    break;
                case this.character + "-right-walk":
                    this.body.setTexture(this.character, this.character + "-right");
                    this.body.anims.stop();
                    break;
                case this.character + "-back-walk":
                    this.body.setTexture(this.character, this.character + "-back");
                    this.body.anims.stop();
                    break;
                case this.character + "-front-walk":
                    this.body.setTexture(this.character, this.character + "-front");
                    this.body.anims.stop();
                    break;
                default:
                    this.body.anims.stop();
            }
        }
    }

}