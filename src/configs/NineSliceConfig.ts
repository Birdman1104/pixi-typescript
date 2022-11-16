export const getGreenButtonNineSliceConfig = (state: "up" | "down"): NineSliceConfig => {
    return {
        texture: `green-button-${state}`,
        data: [35, 35, 35, 35],
        width: 200,
        height: 100,
    };
};
