/// <reference path="phaser/phaser.d.ts"/>

import Point = Phaser.Point;
import DisplayObject = PIXI.DisplayObject;
class mainState extends Phaser.State
{
    game: Phaser.Game;
    private pickups:Phaser.Group;
    private pickup:Phaser.Sprite;
    private ufo:Phaser.Sprite;
    private cursor:Phaser.CursorKeys;
    private MAX_SPEED:number = 300; // pixels/second
    private ACCELERATION:number = 500; // pixels/second
    private DRAG:number = 200; //pixels/second
    private walls:Phaser.TilemapLayer;
    private map:Phaser.Tilemap;

    preload():void
    {
        super.preload();
        this.load.image('ufo', 'assets/UFO_low.png');
        this.load.image('pickup', 'assets/Pickup_low.png');
        this.load.image('background', 'assets/Background_low.png');
        this.load.image('pickup', 'assets/Pickup_low.png');
        this.game.load.tilemap('tilemap', 'assets/tiles.json', null, Phaser.Tilemap.TILED_JSON);
        this.physics.startSystem(Phaser.Physics.ARCADE);
    }
    create():void
    {
        super.create();
        this.configMAP();
        this.configUFO();
        this.configPICKUPS();
    }
    update():void
    {
        super.update();
        this.physics.arcade.collide(this.ufo, this.walls);
        if (this.cursor.left.isDown) {this.ufo.body.acceleration.x = -this.ACCELERATION;}
        else if (this.cursor.right.isDown) {this.ufo.body.acceleration.x = this.ACCELERATION;}
        else if (this.cursor.up.isDown) {this.ufo.body.acceleration.y = -this.ACCELERATION;}
        else if (this.cursor.down.isDown) {this.ufo.body.acceleration.y = this.ACCELERATION;}
        else
        {
            this.ufo.body.acceleration.x = 0;
            this.ufo.body.acceleration.y = 0;
        }
    }
    private configMAP()
    {
        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('Background_low', 'background');
        var background = this.map.createLayer('world');
        this.walls = this.map.createLayer('walls');
        this.map.setCollisionBetween(1, 100, true, 'walls');
    }
    private configUFO()
    {
        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        this.ufo.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.ufo);
        this.cursor = this.input.keyboard.createCursorKeys();
        this.ufo.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y
        this.ufo.body.drag.setTo(this.DRAG, this.DRAG);
        this.ufo.body.collideWorldBounds = true;
        this.ufo.body.bounce.setTo(0.8);
        this.ufo.body.angularAcceleration = 200;
        this.ufo.body.maxAngular = 200;
    };

    private configPICKUPS():void
    {
        this.pickups.enableBody = true;
        this.pickups = this.add.group();
        this.map.createFromObjects('pickups', 101, 'pickup', 0, true, false, this.pickups);

        /*var positions:Point[] = [
            new Point(300, 125), new Point(300, 475),
            new Point(125, 300), new Point(475, 300),
            new Point(175, 175), new Point(425, 175),
            new Point(175, 425), new Point(425, 425),
        ];
        for (var x = 0; x < positions.length; x++)
        {
            var position = positions[x];
            this.pickup = new Phaser.Sprite(this.game, position.x, position.y, 'pickup');
            this.physics.enable(this.pickup);
            this.pickup.body.angularVelocity = 200;
            this.pickup.body.maxVelocity = 200;
            this.add.existing(this.pickup);
        }*/
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
