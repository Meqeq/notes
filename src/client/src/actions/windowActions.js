export const OPEN = "window:open";
export const CLOSE = "window:close";

export const open = component => {
    return {
        type: OPEN,
        payload: component
    }
}

export const close = () => {
    return { type: CLOSE }
}