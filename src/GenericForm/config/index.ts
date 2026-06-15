import isMobile from "../utils/is-mobile";

const env = {
    ENV_SERVER_URL: import.meta.env.ENV_SERVER_URL,
    ENV_MODE: import.meta.env.ENV_MODE,
    ENV_SGR_MENU: import.meta.env.ENV_SGR_MENU
};
const mode: boolean = env.ENV_MODE === "dev";


export {
    env, mode
}

export const notifications: any = {
    options: {
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
        },
        autoHideDuration: 5000,
    },
    maxSnack: isMobile ? 3 : 4,
};