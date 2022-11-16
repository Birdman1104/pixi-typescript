import * as PIXI from "pixi.js";

export const makeNineSlice = (config: NineSliceConfig): PIXI.NineSlicePlane => {
    const {
        texture,
        data,
        width,
        height,
        tint,
        scale = new PIXI.Point(1, 1),
        position = new PIXI.Point(0, 0),
        pivot = new PIXI.Point(config.width / 2, config.height / 2),
    } = config;

    const img = new PIXI.NineSlicePlane(PIXI.Texture.from(texture), ...data);
    img.width = width;
    img.height = height;

    img.scale.copyFrom(scale);
    img.position.copyFrom(position);
    img.pivot.copyFrom(pivot);

    if (tint) img.tint = tint;

    return img;
};

export const makeSprite = (config: SpriteConfig): PIXI.Sprite => {
    const {
        texture,
        tint = 0,
        position = new PIXI.Point(0, 0),
        scale = new PIXI.Point(1, 1),
        anchor = new PIXI.Point(0.5, 0.5),
    } = config;

    const img = PIXI.Sprite.from(texture);

    img.scale.copyFrom(scale);
    img.anchor.copyFrom(anchor);
    img.position.copyFrom(position);

    if (tint) img.tint = tint;

    return img;
};
