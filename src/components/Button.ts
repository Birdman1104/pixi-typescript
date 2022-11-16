import * as PIXI from "pixi.js";
import { makeNineSlice, makeSprite } from "../utils";

abstract class AbstractButton extends PIXI.Container {
    protected states: any;

    public constructor({ states, input }: ButtonConfig) {
        super();

        this.createStates(states);
        this.createHitArea(input);
    }

    public get enabled(): boolean {
        return this.interactive;
    }

    public switchInput(value: boolean): void {
        this.interactive = value;
    }

    public switchEnable(value: boolean): void {
        this.switchInput(value);

        this.setState("up");
        if (value === false) {
            this.setState("disable");
        }
    }

    private createStates({ up, down, disable }: ButtonStatesConfig = {}): void {
        this.states = {
            up: up && this.createState(up),
            down: down && this.createState(down),
            disable: disable && this.createState(disable),
        };
    }

    private createHitArea(input: ButtonInputConfig = {}): void {
        const { area } = input;

        this.hitArea = area || new PIXI.Rectangle().copyFrom(this.getLocalBounds());

        this.on("pointerdown", () => this.setState("down"), this);
        this.on("pointerup", () => this.setState("up"), this);
        this.on("pointerupoutside", () => this.setState("up"), this);
    }

    private setState(key: string): void {
        if (!this.states[key]) {
            return;
        }

        for (const prop in this.states) {
            if (this.states.hasOwnProperty(prop) && this.states[prop]) {
                this.states[prop].visible = false;
            }
        }

        this.states[key].visible = true;
    }

    protected abstract createState(config: ButtonStateConfig): ButtonState;
}

export class Button extends AbstractButton {
    protected createState({ bg, label }: ButtonStateConfig): ButtonState {
        const state = new PIXI.Container();

        this.createBg(state, bg);
        label && this.createLabel(state, label);
        this.addChild(state);

        return state;
    }

    private createBg(state: PIXI.Container, bg: NineSliceConfig | SpriteConfig): void {
        const { width, height } = bg as NineSliceConfig;
        const bgObj = width && height ? makeNineSlice(bg as NineSliceConfig) : makeSprite(bg as SpriteConfig);
        state.addChild(bgObj);
    }

    private createLabel(state: PIXI.Container, labelConfig: TextConfig): void {
        const text = new PIXI.BitmapText(labelConfig.text, labelConfig.style);
        text.anchor.set(0.5);
        state.addChild(text);
    }
}
