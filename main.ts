/// <reference path="phaser/phaser.d.ts"/>

class mainState extends Phaser.State {
    game: Phaser.Game;
    private ufo:Phaser.Sprite;
    private cursor:Phaser.CursorKeys;
    private MAX_SPEED:number = 300; // pixels/second
    private ACCELERATION:number = 500; // pixels/second
    private DRAG:number = 200; //pixels/second
    preload():void {
        super.preload();
        this.load.image('ufo', 'assets/UFO_low.png');
        this.load.image('pickup', 'assets/Pickup_low.png');
        this.load.image('background', 'assets/Background_low.png');
        this.load.image('0.0', 'assets/Background_low-0-0.png');
        this.load.image('0.1', 'assets/Background_low-0-1.png');
        this.load.image('0.2', 'assets/Background_low-0-2.png');
        this.load.image('1.0', 'assets/Background_low-1-0.png');
        this.load.image('1.1', 'assets/Background_low-1-1.png');
        this.load.image('1.2', 'assets/Background_low-1-2.png');
        this.load.image('2.0', 'assets/Background_low-2-0.png');
        this.load.image('2.1', 'assets/Background_low-2-1.png');
        this.load.image('2.2', 'assets/Background_low-2-2.png');
        this.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create():void {
        super.create();
        //var background;
        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        var wall_00 = this.add.sprite(0, 0, '0.0');
        var wall_01  = this.add.sprite(0, wall_00.height, '0.1');
        var wall_02  = this.add.sprite(0, wall_00.height+wall_01.height, '0.2');

      //  var wall_10  = this.add.sprite(0, 0, '1.0');
       // var wall_11  = this.add.sprite(0, 0, '1.1');
       // var wall_12  = this.add.sprite(0, 0, '1.2');
       // var wall_20  = this.add.sprite(0, wall_20.width, '2.0');
       // var wall_21  = this.add.sprite(wall_20.width, wall_21.width, '2.1');
       // var wall_22  = this.add.sprite(wall_20.width+wall_21.width, wall2, '2.2');

       // var scale = this.world.height / background.height;
      //  background.scale.setTo(scale, scale);


       // this.ufo.scale.setTo(scale - 0.05, scale - 0.05);
        this.ufo.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.ufo);
        this.cursor = this.input.keyboard.createCursorKeys();
        this.ufo.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y
        this.ufo.body.drag.setTo(this.DRAG, this.DRAG);
        this.ufo.body.collideWorldBounds = true;
        this.ufo.body.bounce.setTo(0.8);

    }

    update():void
    {
        super.update();
        if (this.cursor.left.isDown) {
            this.ufo.body.acceleration.x = -this.ACCELERATION;
        }
        else if (this.cursor.right.isDown) {
            this.ufo.body.acceleration.x = this.ACCELERATION;
        }
        else if (this.cursor.up.isDown) {
            this.ufo.body.acceleration.y = -this.ACCELERATION;
        }
        else if (this.cursor.down.isDown) {
            this.ufo.body.acceleration.y = this.ACCELERATION;
        }
        else
        {
            this.ufo.body.acceleration.x = 0;
            this.ufo.body.acceleration.y = 0;
        }
    }
}


class SimpleGame {
    game:Phaser.Game;
    constructor()
    {
        this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
}
window.onload = () => {
    var game = new SimpleGame();
};
