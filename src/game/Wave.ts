// Liberapp 2019 - Tahiti Katagai
// 地形生成

class Wave extends GameObject{

    static hardRate:number;

    waveY:number=0;

    constructor() {
        super();
        Wave.hardRate = 0;
    }

    update() {
        const camHead = Camera2D.y;
        if( camHead >= this.waveY ){
            const lane = randI(0, 4);
            this.newBlock( lane );            
            Score.I.addPoint();
            Wave.hardRate = Util.clamp( this.waveY / Util.width / 20, 0, 1 );
        }
    }

    newBlock( lane:number ){
        // todo new Block on the lane
    }
}

