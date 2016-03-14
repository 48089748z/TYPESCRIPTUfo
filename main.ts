/// <reference path="phaser/phaser.d.ts"/>

import Point = Phaser.Point;
import DisplayObject = PIXI.DisplayObject;
import Sprite = PIXI.Sprite;
class mainState extends Phaser.State
{
    game: Phaser.Game;
    private pickups:Phaser.Group;
    private ufo:Phaser.Sprite;
    private monster:Phaser.Sprite;
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
        this.load.image('monster', 'assets/monster_low.png');
        this.game.load.tilemap('tilemap', 'assets/tiles.json', null, Phaser.Tilemap.TILED_JSON);
        this.physics.startSystem(Phaser.Physics.ARCADE);
    }
    create():void
    {
        super.create();
        this.configMAP();
        this.configUFO();
        this.configMONSTER();
        this.configPICKUPS();
    }
    update():void
    {
        super.update();
        this.physics.arcade.collide(this.ufo, this.walls);
        this.physics.arcade.overlap(this.ufo, this.pickups, this.getPickup, null, this);
        if (this.monster.overlap(this.ufo))
        {
            this.ufo = this.add.sprite(this.ufo.body.x, this.ufo.body.y, 'pickup');
            this.ufo.kill()
        }
        if (this.cursor.left.isDown)
        {
            this.ufo.body.acceleration.x = -this.ACCELERATION;
            this.monster.body.acceleration.x = -this.ACCELERATION;
        }
        else if (this.cursor.right.isDown)
        {
            this.ufo.body.acceleration.x = this.ACCELERATION;
            this.monster.body.acceleration.x = this.ACCELERATION;
        }
        else if (this.cursor.up.isDown)
        {
            this.ufo.body.acceleration.y = -this.ACCELERATION;
            this.monster.body.acceleration.y = -this.ACCELERATION;
        }
        else if (this.cursor.down.isDown)
        {
            this.ufo.body.acceleration.y = this.ACCELERATION;
            this.monster.body.acceleration.y = this.ACCELERATION;
        }
        else
        {
            this.ufo.body.acceleration.x = 0;
            this.ufo.body.acceleration.y = 0;
        }
    }
    getPickup(ufo:Phaser.Sprite, overlappedPickup:Pickup):void
    {
        overlappedPickup.kill();
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
    private configMONSTER()
    {
        this.monster = this.add.sprite(300.0, 100.0, 'monster');
        this.physics.enable(this.monster);
        this.monster.body.collideWorldBounds = true;
        this.monster.anchor.setTo(0.5, 0.5);
        this.monster.body.bounce.setTo(1.0);
        this.monster.body.maxVelocity.setTo(150, 150);
    }

    private configPICKUPS():void
    {
        //this.map.createFromObjects('pickups', 101, 'pickup', 0, true, false, this.pickups);
        this.pickups = this.add.group();
        var positions:Point[] = [
            new Point(300, 125), new Point(300, 475),
            new Point(125, 300), new Point(475, 300),
            new Point(175, 175), new Point(425, 175),
            new Point(175, 425), new Point(425, 425),
        ];
        for (var x = 0; x < positions.length; x++)
        {
            var pickup = new Pickup(this.game, positions[x].x, positions[x].y, 'pickup', 0);
            this.pickups.add(pickup);
            this.add.existing(pickup);

        }
        this.pickups.enableBody = true;
    }
}
class Pickup extends Phaser.Sprite
{

    constructor(game:Phaser.Game, x:number, y:number, key:string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture, frame:string|number) {
        super(game, x, y, key, frame);
        this.anchor.setTo(0.5,0.5);
    }

    update():void
    {
        super.update();
        this.angle = this.angle+1;
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
