// Liberapp 2019 - Tahiti Katagai
// レーン描画

class Lane extends GameObject{

    constructor( x:number, y:number, w:number, h:number, color:number ) {
        super();
        let shape = new egret.Shape();
        this.display = shape;
        const doc:egret.DisplayObjectContainer = GameObject.baseDisplay;
        doc.addChildAt( this.display, 1 );
        
        shape.graphics.lineStyle( 6, color );
        shape.graphics.drawRect(x, y, w, h);

        // shape.graphics.beginFill( color, 1 );
        // shape.graphics.drawRect(x, y, w, h);
        // shape.graphics.endFill();
    }
    update() {
    }
}
