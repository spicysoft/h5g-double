// Liberapp 2019 - Tahiti Katagai
// 地形生成

class Wave extends GameObject{

    lanes:number[];
    mileage:number=0;
    milestone:number=0;

    constructor( lanes:number[] ) {
        super();
        this.lanes = lanes;
        Game.hard = 0;
    }

    update() {
        if( GameOver.I || StartMessage.I ){
            Game.speed = 0;
            return;
        }
        Game.speed = Util.lerp( Util.h(1/150), Util.h(1/60), Game.hard );
        Game.hard = Util.clamp( this.mileage / Util.h( 50 ), 0, 1 );

        this.mileage += Game.speed;
        
        if( this.milestone <= this.mileage ){
            this.milestone += Util.h(0.5);
            Score.I.addPoint();
            
            if( randBool(0.8) ){
                new Block( this.lanes[randI(0, 4)], -Util.h(LANE_RADIUS_PER_H) );
            }
            else{
                new Block( this.lanes[randI(0, 2)], -Util.h(LANE_RADIUS_PER_H) );
                new Block( this.lanes[randI(2, 4)], -Util.h(LANE_RADIUS_PER_H) );
            }
        }
    }
}

