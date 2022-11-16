import { Spine } from "pixi-spine";
import * as PIXI from "pixi.js";

export class Pixie extends PIXI.Container {
    private pixie: Spine;
    public constructor(private spineData: any) {
        super();
        this.createSpine();
    }

    public jump(): void {
        this.pixie.state.setAnimation(0, "jump", false);
    }

    private createSpine(): void {
        this.pixie = new Spine(this.spineData);
        this.pixie.scale.set(0.5);
        this.pixie.state.setAnimation(0, "running", true);
        this.pixie.state.data.defaultMix = 0.2;
        this.addChild(this.pixie);

        this.pixie.state.addListener({
            complete: (entry: any) => {
                if (entry.animation.name === "jump") {
                    this.emit("animationComplete");
                    this.pixie.state.setAnimation(0, "running", true);
                }
            },
        });
    }
}
