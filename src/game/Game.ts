// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PLAYER_RADIUS_PER_H = 1/16;
const PLAYER_SPEED_PER_H = 1/25;
const LANE_WIDTH_PER_H = 1/8;
const LANE_RADIUS_PER_H = LANE_WIDTH_PER_H / 2;

const SAVE_KEY_BESTSCORE = "double-bestScore";

const BACK_COLOR = 0xffffff;    // index.htmlで設定
const FONT_COLOR = 0x505050;
const PLAYER_COLOR = 0x74a4af;
const BLOCK_COLOR = 0xe00000;
const LANE_COLOR = 0xe0e0e0; //0x9a9a9a;//0x74a4af;

class Game {

    static loadSceneGamePlay() {
        Game.speed = 0;
        // todo new 4 lanes
        let lanes = [];
        let laneW = Util.h(LANE_WIDTH_PER_H);
        lanes[0] = Util.w(1/2) - laneW * 1.5;
        lanes[1] = Util.w(1/2) - laneW * 0.5;
        lanes[2] = Util.w(1/2) + laneW * 0.5;
        lanes[3] = Util.w(1/2) + laneW * 1.5;

        laneW *= 0.8;
        new Lane( lanes[0]-laneW*0.5, Util.h(0), laneW, Util.h(1), LANE_COLOR );
        new Lane( lanes[1]-laneW*0.5, Util.h(0), laneW, Util.h(1), LANE_COLOR );
        new Lane( lanes[2]-laneW*0.5, Util.h(0), laneW, Util.h(1), LANE_COLOR );
        new Lane( lanes[3]-laneW*0.5, Util.h(0), laneW, Util.h(1), LANE_COLOR );

        new Player( lanes[1], Util.h(0.75), lanes[0] );
        new Player( lanes[2], Util.h(0.75), lanes[3] );
        new Wave( lanes );

        new StartMessage();
        new Score();
    }

    static speed:number;
    static hard:number;
}
