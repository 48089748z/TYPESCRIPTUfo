/// <reference path="phaser/phaser.d.ts"/>

class mainState extends Phaser.State {
    game: Phaser.Game;
    private ufo:Phaser.Sprite;
    private cursor:Phaser.CursorKeys;
    private UFO_SPEED = 200;
    preload():void {
        super.preload();
        this.load.image('ufo', 'assets/UFO_low.png');
        this.load.image('pickup', 'assets/Pickup_low.png');
        this.load.image('background', 'assets/Background_low.png');
        this.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create():void {
        super.create();
        var background;

        background = this.add.sprite(0, 0, 'background');
        var scale = this.world.height / background.height;
        background.scale.setTo(scale, scale);

        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        this.ufo.scale.setTo(scale - 0.05, scale - 0.05);
        this.ufo.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.ufo);
        this.cursor = this.input.keyboard.createCursorKeys();
    }

    update():void {
        super.update();
        this.ufo.body.velocity.x=0;
        this.ufo.body.velocity.y=0;
        if (this.cursor.left.isDown) {
            this.ufo.body.velocity.x = -this.UFO_SPEED;
        }
        if (this.cursor.right.isDown) {
            this.ufo.body.velocity.x = this.UFO_SPEED;
        }
        if (this.cursor.up.isDown) {
            this.ufo.body.velocity.y = -this.UFO_SPEED;
        }
        if (this.cursor.down.isDown) {
            this.ufo.body.velocity.y = this.UFO_SPEED;
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
