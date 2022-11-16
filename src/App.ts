import * as PIXI from "pixi.js";
import { Bunny } from "./components/Bunny";
import { Button } from "./components/Button";
import { Pixie } from "./components/Pixie";
import { getGreenButtonConfig, getJumpButtonConfig } from "./configs/ButtonConfig";

export class Game extends PIXI.Application {
    private bunny: Bunny;
    private greenButton: Button;
    private jumpButton: Button;
    private pixie: Pixie;

    public constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xc3c3c3,
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.body.appendChild(this.view);

        this.loadAssets();
    }

    private loadAssets(): void {
        this.loader.add([
            { name: "Desyrel", url: "./assets/desyrel.xml" },
            { name: "bunny", url: "./assets/bunny.png" },
            { name: "pixie", url: "./assets/spine/pixie.json" },
            { name: "green-button-up", url: "./assets/green-button-up.png" },
            { name: "green-button-down", url: "./assets/green-button-down.png" },
        ]);

        this.loader.onComplete.add(this.onLoadComplete, this);
        this.loader.onProgress.add(this.onLoadProgress, this);
        this.loader.onError.add(this.onLoadError, this);
        this.loader.load();
    }

    private onLoadProgress(loader, resource): void {
        console.log(`progress  |  ${loader.progress} | ${resource.name}`);
    }

    private onLoadError(error, _loader, _resource): void {
        throw new Error(error);
    }

    private onLoadComplete(_loader, _resources): void {
        this.createBunny();
    }

    private createBunny(): void {
        this.bunny = new Bunny();
        this.bunny.x = this.renderer.width * 0.5;
        this.bunny.y = this.renderer.height * 0.5;
        this.stage.addChild(this.bunny);
        this.bunny.animateBunnyFadeIn();
        this.bunny.on("fadeInComplete", this.createButton, this);
    }

    private createButton(): void {
        this.greenButton = new Button(getGreenButtonConfig());
        this.greenButton.x = this.renderer.width * 0.5;
        this.greenButton.y = this.renderer.height * 0.5 + 200;
        this.greenButton.switchEnable(true);
        this.stage.addChild(this.greenButton);
        this.greenButton.on("pointerup", this.onButtonClick, this);
    }

    private createJumpButton(): void {
        this.jumpButton = new Button(getJumpButtonConfig());
        this.jumpButton.x = this.renderer.width * 0.5;
        this.jumpButton.y = this.renderer.height * 0.5 + 300;
        this.jumpButton.switchEnable(true);
        this.stage.addChild(this.jumpButton);
        this.jumpButton.on("pointerup", this.onJumpButtonClick, this);
    }

    private onButtonClick(): void {
        this.bunny?.destroy();
        this.greenButton.destroy();
        this.createJumpButton();
        this.createSpine();
    }

    private onJumpButtonClick(): void {
        this.jumpButton.switchEnable(false);
        this.pixie.jump();
    }

    private createSpine(): void {
        this.pixie = new Pixie(this.loader.resources.pixie.spineData);
        this.pixie.x = this.renderer.width * 0.5;
        this.pixie.y = this.renderer.height * 0.5;
        this.stage.addChild(this.pixie);

        this.pixie.on("animationComplete", () => this.jumpButton.switchEnable(true));
    }
}
