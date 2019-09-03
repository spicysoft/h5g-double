// Liberapp 2019 - Tahiti Katagai
// 地形生成

class Wave extends GameObject{

    static hardRate:number;

    lanes:number[];
    mileage:number=0;
    milestone:number=0;

    constructor( lanes:number[] ) {
        super();
        this.lanes = lanes;
        Wave.hardRate = 0;
    }

    update() {
        // Wave.hardRate = Util.clamp( this.mileage / Util.h( 100 ), 0, 1 );
        // const speed = Util.lerp( Util.h(1/120), Util.h(1/60), Wave.hardRate );

        // const camHead = Camera2D.y;
        // if( camHead >= this.waveY ){
        //     const lane = randI(0, 4);
        //     this.newBlock( lane );            
        //     Score.I.addPoint();
        //     Wave.hardRate = Util.clamp( this.waveY / Util.width / 20, 0, 1 );
        // }
    }

    newBlock( lane:number ){
        // todo new Block on the lane
    }
}

