// Liberapp 2019 - Tahiti Katagai
// プレイヤー
// レーン上を走るボール

class Player extends GameObject{

    static players:Player[] = [];

    get x():number { return this.display.x; }
    get y():number { return this.display.y; }
    set x( x:number ){ this.display.x = x; }
    set y( y:number ){ this.display.y = y; }

    laneX:number[] = [];
    laneIndex:number = 0;
    radius:number;
    button:Button;
    state:()=>void = this.stateNone;

    constructor( px:number, py:number, anotherX:number ) {
        super();

        Player.players.push(this);
        this.laneX[1] = px;
        this.laneX[0] = anotherX;
        this.radius = Util.h(PLAYER_RADIUS_PER_H);
        this.setDisplay( px, py );

        const btnX = ( px < Util.w(0.5) ) ? 0.25 : 0.75;
        const wide = 0.5;
        this.button = new Button( null, 0, 0, btnX, 0.5, wide, 1, 0x000000, 0.0, null ); // 透明な半画面ボタン
    }

    onDestroy(){
        this.button.destroy();
        Player.players = Player.players.filter( obj => { return (obj != this); } );
    }

    setDisplay( x:number, y:number ){
        let shape:egret.Shape = this.display as egret.Shape;
        if( this.display == null ){
            this.display = shape = new egret.Shape();
            GameObject.gameDisplay.addChild(this.display);
        }else
            shape.graphics.clear();

        shape.x = x;
        shape.y = y;
        shape.graphics.beginFill( PLAYER_COLOR );
        shape.graphics.drawCircle( 0, 0, this.radius );
        shape.graphics.endFill();
    }

    update(){
        this.state();
    }

    stateNone(){
    }

    setStateRun(){
        this.state = this.stateRun;
    }
    stateRun() {
        this.laneIndex = ( this.button.touch ) ? 1 : 0;
        this.x += (this.laneX[ this.laneIndex ] - this.x) * 0.25;
    }

    setStateMiss(){
        if( this.state == this.stateMiss )
            return;
        this.state = this.stateMiss;
    }
    stateMiss(){
    }
}
