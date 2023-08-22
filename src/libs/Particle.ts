export class Particle {

    public static readonly particles: Particle[] = [];

    private static lastColor: number = 0;

    private readonly ctx: CanvasRenderingContext2D;
    private speedX: number;
    private speedY: number;
    private _x: number;
    private _y: number;
    private _size: number;
    private readonly _color: string;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
        this.ctx = ctx;
        this.speedX = Math.random() * 8 - 4;
        this.speedY = Math.random() * 8 - 4;
        this._x = x;
        this._y = y;
        this._size = Math.random() * 10 + 1;
        this._color = `hsl(${Particle.lastColor}deg, 100%, 50%)`;
        Particle.lastColor += 1.5;
        Particle.particles.push(this);
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get size() {
        return this._size;
    }

    get color() {
        return this._color;
    }

    update() {
        if (this._size >= .15) {
            this._x += this.speedX *= .98;
            this._y += this.speedY *= .98;
            this._size -= .15;
            this.draw();
            return true;
        }
        return false;
    }

    private draw() {
        this.ctx.fillStyle = this._color;
        this.ctx.beginPath();
        this.ctx.arc(this._x, this._y, this._size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

}
