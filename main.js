/// <reference path="phaser/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mainState = (function (_super) {
    __extends(mainState, _super);
    function mainState() {
        _super.apply(this, arguments);
        this.MAX_SPEED = 300; // pixels/second
        this.ACCELERATION = 500; // pixels/second
        this.DRAG = 200; //pixels/second
    }
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
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
    };
    mainState.prototype.create = function () {
        _super.prototype.create.call(this);
        var background = this.add.sprite(0, 0, 'background');
        var scale = this.world.height / background.height;
        background.scale.setTo(scale, scale);
        this.ufo.scale.setTo(scale - 0.05, scale - 0.05);
        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        this.ufo.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.ufo);
        this.cursor = this.input.keyboard.createCursorKeys();
        this.ufo.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y
        this.ufo.body.drag.setTo(this.DRAG, this.DRAG);
        this.ufo.body.collideWorldBounds = true;
        this.ufo.body.bounce.setTo(0.8);
    };
    mainState.prototype.update = function () {
        _super.prototype.update.call(this);
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
        else {
            this.ufo.body.acceleration.x = 0;
            this.ufo.body.acceleration.y = 0;
        }
    };
    return mainState;
})(Phaser.State);
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
    return SimpleGame;
})();
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=main.js.map