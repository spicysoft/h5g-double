// Liberapp 2019 - Tahiti Katagai
// 障害物のブロック

class Block extends GameObject{

    static blocks:Block[] = [];

    constructor( x:number, y:number ) {
        super();

        Block.blocks.push(this);
        this.setDisplay(x, y);
    }

    onDestroy(){
        Block.blocks = Block.blocks.filter( obj => obj != this );
    }

    setDisplay(x:number, y:number){
        let shape:egret.Shape = this.display as egret.Shape;
        if( shape == null ){
            shape = this.display = new egret.Shape();
            GameObject.gameDisplay.addChild(shape);
            GameObject.gameDisplay.setChildIndex(shape, 1);
        }else{
            shape.graphics.clear();
        }
        shape.x = x;
        shape.y = y;
        shape.graphics.beginFill( BLOCK_COLOR );
        const size = Util.h(LANE_WIDTH_PER_H) * 0.9;
        shape.graphics.drawRoundRect( -0.5*size, -0.5*size, size, size, size*0.2 );
        shape.graphics.endFill();
    }

    update() {
        const half = Util.h(LANE_RADIUS_PER_H) * 0.9;

        this.display.y += Game.speed;

        // プレイヤーとの接触判定
        Player.players.forEach( p => {
            let dx = p.x - this.display.x;
            let dy = p.y - this.display.y;
            let rr = (p.radius + half) ** 2;
            if( dx**2 < rr && dy**2 < rr ){
                const nx = this.display.x + Util.clamp( dx, -half, +half );
                const ny = this.display.y + Util.clamp( dy, -half, +half );
                dx = p.x - nx;
                dy = p.y - ny;
                if( dx**2 + dy**2 < p.radius**2 ){
                    GameOver.Create();
                }
            }
        });

        // 画面外で消滅
        if( this.display.y >= Util.height + half )
            this.destroy();
    }
}

