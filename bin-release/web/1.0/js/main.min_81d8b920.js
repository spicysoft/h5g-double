function rand(){return globalRandom.v()}function randF(t,e){return globalRandom.f(t,e)}function randI(t,e){return globalRandom.i(t,e)}function randBool(t){return void 0===t&&(t=.5),globalRandom.bool(t)}var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var a in e)e.hasOwnProperty(a)&&(t[a]=e[a]);i.prototype=e.prototype,t.prototype=new i},GameObject=function(){function t(){this.display=null,t.objects.push(this)}return t.prototype.destroy=function(){this.deleteFlag=!0},t.prototype.onDestroy=function(){},t.initial=function(e){t.baseDisplay=e,t.gameDisplay=new egret.DisplayObjectContainer,t.baseDisplay.addChild(t.gameDisplay)},t.process=function(){t.objects.forEach(function(t){return t.update()}),t.objects=t.objects.filter(function(t){return t.deleteFlag&&t._delete(),!t.deleteFlag}),t.transit&&(t.dispose(),t.transit(),t.transit=null)},t.dispose=function(){t.objects=t.objects.filter(function(t){return t.destroy(),t._delete(),!1})},t.prototype._delete=function(){this.onDestroy(),this.display&&(this.display.parent.removeChild(this.display),this.display=null)},t.objects=[],t}();__reflect(GameObject.prototype,"GameObject");var Camera2D=function(){function t(){}return t.initial=function(){t.x=0,t.y=0,t.localX=0,t.localY=0,t.scale=1,t.rotation=0},t.process=function(){GameObject.gameDisplay.anchorOffsetX=t.x,GameObject.gameDisplay.anchorOffsetY=t.y,GameObject.gameDisplay.x=this.localX,GameObject.gameDisplay.y=this.localY,GameObject.gameDisplay.scaleX=GameObject.gameDisplay.scaleY=t.scale,GameObject.gameDisplay.rotation=t.rotation},t}();__reflect(Camera2D.prototype,"Camera2D");var PLAYER_RADIUS_PER_H=1/28,LANE_WIDTH_PER_H=1/9,LANE_RADIUS_PER_H=LANE_WIDTH_PER_H/2,SAVE_KEY_BESTSCORE="double-bestScore",BACK_COLOR=16777215,FONT_COLOR=5263440,PLAYER_COLOR=7644335,BLOCK_COLOR=14680064,LANE_COLOR=14737632,Game=function(){function t(){}return t.loadSceneGamePlay=function(){t.speed=0;var e=[],i=Util.h(LANE_WIDTH_PER_H);e[0]=Util.w(.5)-1.5*i,e[1]=Util.w(.5)-.5*i,e[2]=Util.w(.5)+.5*i,e[3]=Util.w(.5)+1.5*i,i*=.8,new Lane(e[0]-.5*i,Util.h(0),i,Util.h(1),LANE_COLOR),new Lane(e[1]-.5*i,Util.h(0),i,Util.h(1),LANE_COLOR),new Lane(e[2]-.5*i,Util.h(0),i,Util.h(1),LANE_COLOR),new Lane(e[3]-.5*i,Util.h(0),i,Util.h(1),LANE_COLOR),new Player(e[1],Util.h(.75),e[0]),new Player(e[2],Util.h(.75),e[3]),new Wave(e),new StartMessage,new Score},t}();__reflect(Game.prototype,"Game");var Lane=function(t){function e(e,i,a,n,o){var s=t.call(this)||this,r=new egret.Shape;s.display=r;var l=GameObject.baseDisplay;return l.addChildAt(s.display,1),r.graphics.lineStyle(6,o),r.graphics.drawRect(e,i,a,n),s}return __extends(e,t),e.prototype.update=function(){},e}(GameObject);__reflect(Lane.prototype,"Lane");var Player=function(t){function e(i,a,n){var o=t.call(this)||this;o.laneX=[],o.laneIndex=0,o.state=o.stateNone,e.players.push(o),o.laneX[1]=i,o.laneX[0]=n,o.radius=Util.h(PLAYER_RADIUS_PER_H),o.setDisplay(i,a);var s=i<Util.w(.5)?.25:.75,r=.5;return o.button=new Button(null,0,0,s,.5,r,1,0,0,null),o}return __extends(e,t),Object.defineProperty(e.prototype,"x",{get:function(){return this.display.x},set:function(t){this.display.x=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"y",{get:function(){return this.display.y},set:function(t){this.display.y=t},enumerable:!0,configurable:!0}),e.prototype.onDestroy=function(){var t=this;this.button.destroy(),e.players=e.players.filter(function(e){return e!=t})},e.prototype.setDisplay=function(t,e){var i=this.display;null==this.display?(this.display=i=new egret.Shape,GameObject.gameDisplay.addChild(this.display)):i.graphics.clear(),i.x=t,i.y=e,i.graphics.beginFill(PLAYER_COLOR),i.graphics.drawCircle(0,0,this.radius),i.graphics.endFill()},e.prototype.update=function(){this.state()},e.prototype.stateNone=function(){},e.prototype.setStateRun=function(){this.state=this.stateRun},e.prototype.stateRun=function(){this.laneIndex=this.button.touch?1:0,this.x+=.25*(this.laneX[this.laneIndex]-this.x)},e.prototype.setStateMiss=function(){this.state!=this.stateMiss&&(this.state=this.stateMiss)},e.prototype.stateMiss=function(){},e.players=[],e}(GameObject);__reflect(Player.prototype,"Player");var Wave=function(t){function e(e){var i=t.call(this)||this;return i.mileage=0,i.milestone=0,i.lanes=e,Game.hard=0,i}return __extends(e,t),e.prototype.update=function(){return GameOver.I||StartMessage.I?void(Game.speed=0):(Game.speed=Util.lerp(Util.h(1/150),Util.h(1/60),Game.hard),Game.hard=Util.clamp(this.mileage/Util.h(50),0,1),this.mileage+=Game.speed,void(this.milestone<=this.mileage&&(this.milestone+=Util.h(.5),Score.I.addPoint(),randBool(.8)?new Block(this.lanes[randI(0,4)],-Util.h(LANE_RADIUS_PER_H)):(new Block(this.lanes[randI(0,2)],-Util.h(LANE_RADIUS_PER_H)),new Block(this.lanes[randI(2,4)],-Util.h(LANE_RADIUS_PER_H))))))},e}(GameObject);__reflect(Wave.prototype,"Wave");var Button=function(t){function e(e,i,a,n,o,s,r,l,h,c){var p=t.call(this)||this;p.text=null,p.onTap=null,p.press=!1,p.touch=!1,p.x=0,p.y=0;var u=new egret.Shape;GameObject.baseDisplay.addChild(u),u.graphics.beginFill(l,h);var d=s*Util.width,y=r*Util.height;return u.graphics.drawRoundRect(-.5*d,-.5*y,d,y,.2*d),u.graphics.endFill(),u.touchEnabled=!0,u.x=n*Util.width,u.y=o*Util.height,p.display=u,e&&(p.text=Util.newTextField(e,i,a,n,o,!0,!1),GameObject.baseDisplay.addChild(p.text)),p.onTap=c,p.onTap&&p.display.addEventListener(egret.TouchEvent.TOUCH_TAP,p.onTap,p),p.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN,p.touchBegin,p),p.display.addEventListener(egret.TouchEvent.TOUCH_MOVE,p.touchMove,p),p.display.addEventListener(egret.TouchEvent.TOUCH_END,p.touchEnd,p),p}return __extends(e,t),e.prototype.onDestroy=function(){this.onTap&&this.display.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this),GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this),GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this),GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this),this.text&&GameObject.baseDisplay.removeChild(this.text)},e.prototype.update=function(){var t=this.touch?1.1:1;this.display.scaleX=this.display.scaleY=this.display.scaleX+.25*(t-this.display.scaleX),this.press=!1},e.prototype.touchBegin=function(t){this.x=t.stageX,this.y=t.stageY,this.press=!0,this.touch=!0},e.prototype.touchMove=function(t){this.x=t.stageX,this.y=t.stageY,this.touch=!0},e.prototype.touchEnd=function(t){this.touch=!1},e}(GameObject);__reflect(Button.prototype,"Button");var Block=function(t){function e(i,a){var n=t.call(this)||this;return e.blocks.push(n),n.setDisplay(i,a),n}return __extends(e,t),e.prototype.onDestroy=function(){var t=this;e.blocks=e.blocks.filter(function(e){return e!=t})},e.prototype.setDisplay=function(t,e){var i=this.display;null==i?(i=this.display=new egret.Shape,GameObject.gameDisplay.addChild(i),GameObject.gameDisplay.setChildIndex(i,1)):i.graphics.clear(),i.x=t,i.y=e,i.graphics.beginFill(BLOCK_COLOR);var a=.9*Util.h(LANE_WIDTH_PER_H);i.graphics.drawRoundRect(-.5*a,-.5*a,a,a,.2*a),i.graphics.endFill()},e.prototype.update=function(){var t=this,e=.9*Util.h(LANE_RADIUS_PER_H);this.display.y+=Game.speed,Player.players.forEach(function(i){var a=i.x-t.display.x,n=i.y-t.display.y,o=Math.pow(i.radius+e,2);if(Math.pow(a,2)<o&&Math.pow(n,2)<o){var s=t.display.x+Util.clamp(a,-e,+e),r=t.display.y+Util.clamp(n,-e,+e);a=i.x-s,n=i.y-r,Math.pow(a,2)+Math.pow(n,2)<Math.pow(i.radius,2)&&GameOver.Create()}}),this.display.y>=Util.height+e&&this.destroy()},e.blocks=[],e}(GameObject);__reflect(Block.prototype,"Block");var Main=function(t){function e(){var e=t.call(this)||this;return e.once(egret.Event.ADDED_TO_STAGE,e.addToStage,e),e}return __extends(e,t),e.prototype.addToStage=function(){Util.init(this),GameObject.initial(this.stage),Camera2D.initial(),Game.loadSceneGamePlay(),egret.startTick(this.tickLoop,this)},e.prototype.tickLoop=function(t){return GameObject.process(),Camera2D.process(),!1},e}(eui.UILayer);__reflect(Main.prototype,"Main");var Random=function(){function t(e){void 0===e&&(e=Math.floor(Math.random()*t.max)),this.x=123456789,this.y=362436069,this.z=521288629,this.w=e}return t.prototype.v=function(){return(this.next()&t.max)/(t.max+1)},t.prototype.f=function(t,e){return t+this.v()*(e-t)},t.prototype.i=function(t,e){return Math.floor(this.f(t,e))},t.prototype.bool=function(t){return void 0===t&&(t=.5),this.v()<t},t.prototype.next=function(){var t;return t=this.x^this.x<<11,this.x=this.y,this.y=this.z,this.z=this.w,this.w=this.w^this.w>>>19^(t^t>>>8)},t.max=1073741823,t}();__reflect(Random.prototype,"Random");var globalRandom=new Random,Rect=function(t){function e(e,i,a,n,o,s,r){void 0===s&&(s=!1),void 0===r&&(r=!1);var l=t.call(this)||this,h=new egret.Shape;l.display=h;var c=s?GameObject.gameDisplay:GameObject.baseDisplay;return r?c.addChild(l.display):c.addChildAt(l.display,1),h.graphics.beginFill(o,1),h.graphics.drawRect(e,i,a,n),h.graphics.endFill(),l}return __extends(e,t),e.prototype.update=function(){},e}(GameObject);__reflect(Rect.prototype,"Rect");var Util=function(){function t(){}return t.w=function(e){return e*t.width},t.h=function(e){return e*t.height},t.init=function(t){this.width=t.stage.stageWidth,this.height=t.stage.stageHeight},t.clamp=function(t,e,i){return e>t&&(t=e),t>i&&(t=i),t},t.lerp=function(t,e,i){return t+(e-t)*i},t.deltaAngle=function(t){var e=(t+Math.PI)/(2*Math.PI);return e=65536*e&65535,e=e/65536*Math.PI*2-Math.PI},t.color=function(t,e,i){return 65536*Math.floor(255*t)+256*Math.floor(255*e)+Math.floor(255*i)},t.colorLerp=function(t,e,i){var a=1-i,n=((16711680&t)*a+(16711680&e)*i&16711680)+((65280&t)*a+(65280&e)*i&65280)+((255&t)*a+(255&e)*i&255);return n},t.newTextField=function(e,i,a,n,o,s,r){var l=new egret.TextField;return l.text=e,l.bold=s,l.size=i,l.textColor=a,r?(l.x=(t.width-l.width)*n,l.y=(t.height-l.height)*o):(l.x=t.width*n-.5*l.width,l.y=t.height*o-.5*l.height),l},t}();__reflect(Util.prototype,"Util");var GameOver=function(t){function e(){var i=t.call(this)||this;return i.texts=[],i.retryButton=null,i.step=0,i.fadeInFrame=64,e.I=i,i.texts[0]=Util.newTextField("SCORE : "+Score.I.point.toFixed(),Util.width/12,PLAYER_COLOR,.5,.35,!0,!1),egret.Tween.get(i.texts[0],{loop:!1}).to({alpha:0},0).to({alpha:1},1e3),GameObject.baseDisplay.addChild(i.texts[0]),i}return __extends(e,t),e.Create=function(){return null==e.I&&(Player.players.forEach(function(t){t.setStateMiss()}),new e),e.I},e.prototype.onDestroy=function(){this.texts.forEach(function(t){GameObject.baseDisplay.removeChild(t)}),this.texts=null,e.I=null},e.prototype.update=function(){this.step++,this.step==this.fadeInFrame&&(this.retryButton=new Button("リトライ",Util.width/16,BACK_COLOR,.5,.65,.4,.1,PLAYER_COLOR,1,this.onTapRetry),Score.I.point>Score.I.bestScore&&(egret.localStorage.setItem(SAVE_KEY_BESTSCORE,Score.I.point.toFixed()),this.texts[1]=Util.newTextField("NEW RECORD!",Util.width/13,PLAYER_COLOR,.5,.45,!0,!1),egret.Tween.get(this.texts[1],{loop:!0}).to({alpha:0},500).to({alpha:1},500),GameObject.baseDisplay.addChild(this.texts[1])))},e.prototype.onTapRetry=function(){GameObject.transit=Game.loadSceneGamePlay,this.destroy()},e.I=null,e}(GameObject);__reflect(GameOver.prototype,"GameOver");var Score=function(t){function e(){var i=t.call(this)||this;i.point=0,i.bestScore=0,i.text=null,i.textBest=null,e.I=i,i.point=0,i.text=Util.newTextField("0",Util.width/22,FONT_COLOR,.5,0,!0,!0),GameObject.baseDisplay.addChild(i.text);var a=egret.localStorage.getItem(SAVE_KEY_BESTSCORE);return null==a&&(a="20",egret.localStorage.setItem(SAVE_KEY_BESTSCORE,a)),i.bestScore=parseInt(a),i.textBest=Util.newTextField("BEST:"+a,Util.width/22,FONT_COLOR,0,0,!0,!0),GameObject.baseDisplay.addChild(i.textBest),i}return __extends(e,t),e.prototype.onDestroy=function(){GameObject.baseDisplay.removeChild(this.text),this.text=null,GameObject.baseDisplay.removeChild(this.textBest),this.textBest=null,e.I=null},e.prototype.update=function(){},e.prototype.addPoint=function(t){void 0===t&&(t=1),this.point+=t,this.text.text=""+this.point.toFixed(),this.bestScore<this.point&&(this.textBest.text="BEST:"+this.point.toFixed())},e.I=null,e}(GameObject);__reflect(Score.prototype,"Score");var StartMessage=function(t){function e(){var i=t.call(this)||this;return i.texts=[],e.I=i,i.texts[0]=Util.newTextField("ダブルボール",Util.width/12,FONT_COLOR,.5,.2,!0,!1),i.texts[1]=Util.newTextField("左右の●をタッチでスライド",Util.width/19,FONT_COLOR,.5,.3,!0,!1),i.texts[2]=Util.newTextField("■にぶつからないように進もう",Util.width/19,FONT_COLOR,.5,.35,!0,!1),i.texts.forEach(function(t){GameObject.baseDisplay.addChild(t)}),GameObject.baseDisplay.once(egret.TouchEvent.TOUCH_TAP,i.tap,i),i}return __extends(e,t),e.prototype.onDestroy=function(){this.texts.forEach(function(t){t.parent.removeChild(t)}),this.texts=null,e.I=null},e.prototype.update=function(){},e.prototype.tap=function(t){Player.players.forEach(function(t){t.setStateRun()}),this.destroy()},e.I=null,e}(GameObject);__reflect(StartMessage.prototype,"StartMessage");