declare interface Window {
    pixiGame: PIXI.Application;
}

type NineSliceConfig = {
    texture: string;
    data: number[];
    width: number;
    height: number;
    tint?: number;
    scale?: PIXI.Point;
    pivot?: PIXI.Point;
    position?: PIXI.Point;
};

type SpriteConfig = {
    texture: string;
    tint?: number;
    scale?: PIXI.Point;
    anchor?: PIXI.Point;
    position?: PIXI.Point;
};

type ButtonConfig = {
    input?: ButtonInputConfig;
    states?: ButtonStatesConfig;
};

type ButtonStatesConfig = {
    up?: ButtonStateConfig;
    down?: ButtonStateConfig;
    disable?: ButtonStateConfig;
};

type ButtonStateConfig = {
    bg?: SpriteConfig | NineSliceConfig;
    label?: TextConfig;
};

type ButtonInputConfig = {
    name?: string;
    area?: PIXI.IHitArea;
};

type TextConfig = {
    text: string;
    style: {
        fontName: string;
        fontSize?: number;
        align?: "left" | "center" | "right" | "justify";
        tint?: number;
        letterSpacing?: number;
        maxWidth?: number;
    };
};

type ButtonState = PIXI.Container;
