import { getGreenButtonNineSliceConfig } from "./NineSliceConfig";
import { getGreenButtonTextConfig, getJumpButtonTextConfig } from "./TextConfigs";

export const getGreenButtonConfig = (): ButtonConfig => {
    return {
        states: {
            up: {
                bg: getGreenButtonNineSliceConfig("up"),
                label: getGreenButtonTextConfig(),
            },
            down: {
                bg: getGreenButtonNineSliceConfig("down"),
                label: getGreenButtonTextConfig(0xcccccc),
            },
        },
    };
};

export const getJumpButtonConfig = (): ButtonConfig => {
    return {
        states: {
            up: {
                bg: getGreenButtonNineSliceConfig("up"),
                label: getJumpButtonTextConfig(),
            },
            down: {
                bg: getGreenButtonNineSliceConfig("down"),
                label: getJumpButtonTextConfig(0xcccccc),
            },
            disable: {
                bg: getGreenButtonNineSliceConfig("down"),
                label: getJumpButtonTextConfig(0xcccccc),
            },
        },
    };
};
