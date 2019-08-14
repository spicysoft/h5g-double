// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PLAYER_RADIUS_PER_H = 1/16;
const PLAYER_SPEED_PER_H = 1/25;
const LANE_RADIUS_PER_H = 1/50;

const SAVE_KEY_BESTSCORE = "double-bestScore";

const BACK_COLOR = 0xd0d000;    // index.htmlで設定
const FONT_COLOR = 0x101010;
const SCORE_COLOR = 0x101010;
const PLAYER_COLOR = 0x101010;
const BAR_COLOR   = 0x101010;

class Game {

    static loadSceneGamePlay() {
        // todo new 4 lanes
        new Player( Util.w(1/4), Util.h(0.5) );
        new Wave();
        new StartMessage();
        new Score();
    }
}
