import gsap from "gsap";
import * as PIXI from "pixi.js";

export class Bunny extends PIXI.Container {
    private sprite: PIXI.Sprite;
    private gsapTimeline: gsap.core.Timeline;

    public constructor() {
        super();
        this.createBunny();
    }

    public destroy(): void {
        gsap.killTweensOf(this.sprite);
        this.gsapTimeline?.kill();
        super.destroy();
    }

    public animateBunnyFadeIn(): void {
        gsap.to(this.sprite, {
            alpha: 1,
            duration: 2,
            ease: "sine",
            delay: 0.5,
            onComplete: this.onFadeInComplete,
            callbackScope: this,
        });
    }

    private createBunny(): void {
        const texture = PIXI.Texture.from("assets/bunny.png");
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.alpha = 0;
        this.sprite.anchor.set(0.5);
        this.addChild(this.sprite);
    }

    private onFadeInComplete(): void {
        this.emit("fadeInComplete");
        this.gsapTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0, yoyo: true });
        this.gsapTimeline.to(this.sprite.scale, { x: 4, y: 4, ease: "sine", duration: 2 });
        this.gsapTimeline.to(this.sprite, { rotation: Math.PI * 2, ease: "none", duration: 0.5 });
    }
}
