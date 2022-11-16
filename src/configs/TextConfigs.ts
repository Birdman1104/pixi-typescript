export const getGreenButtonTextConfig = (tint = 0xffffff): TextConfig => {
    return {
        text: "Click Me!",
        style: {
            fontName: "Desyrel",
            fontSize: 32,
            tint,
        },
    };
};

export const getJumpButtonTextConfig = (tint = 0xffffff): TextConfig => {
    return {
        text: "JUMP",
        style: {
            fontName: "Desyrel",
            fontSize: 40,
            tint,
        },
    };
};
