// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PLAYER_RADIUS_PER_H = 1/16;
const PLAYER_SPEED_PER_H = 1/25;
const LANE_WIDTH_PER_H = 1/8;
const LANE_RADIUS_PER_H = LANE_WIDTH_PER_H / 2;

const SAVE_KEY_BESTSCORE = "double-bestScore";

const BACK_COLOR = 0xd0d000;    // index.htmlで設定
const FONT_COLOR = 0x101010;
const PLAYER_COLOR = 0x2080ff;
const LANE_COLOR1 = 0x806030;
const LANE_COLOR2 = 0x806840;

class Game {

    static loadSceneGamePlay() {
        // todo new 4 lanes
        let lanes = [];
        lanes[0] = Util.w(1/2) - Util.h(LANE_RADIUS_PER_H) * 3;
        lanes[1] = Util.w(1/2) - Util.h(LANE_RADIUS_PER_H) * 1;
        lanes[2] = Util.w(1/2) + Util.h(LANE_RADIUS_PER_H) * 1;
        lanes[3] = Util.w(1/2) + Util.h(LANE_RADIUS_PER_H) * 3;

        new Player( lanes[1], Util.h(0.75), lanes[0] );
        new Player( lanes[2], Util.h(0.75), lanes[3] );
        new Wave( lanes );
        // new StartMessage();
        new Score();
    }
}
