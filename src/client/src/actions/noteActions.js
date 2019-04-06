import { OPEN } from './windowActions';

export const ADD_BLOCK = "note:addBlock";
export const CHANGE = "note:onChange";
export const CHANGE_ORDER = "note:changeOrder";
export const DELETE = "note:delete";
export const CREATE_JSON = "note:createJson";

export const addBlock = type => {
    let block = {};
    switch(type) {
        case 'markdown':
            block = {
                type: "markdown",
                content: ""
            }
            break;
        default:
            break;
    }
    return {
        type: ADD_BLOCK,
        payload: block
    }
}

export const change = ( key, content ) => {
    return {
        type: CHANGE,
        payload: { key, content }
    }
}

export const changeOrder = ( key, direction ) => {
    return {
        type: CHANGE_ORDER,
        payload: { key, direction },
    }
}

export const deleteBlock = key => {
    return {
        type: DELETE,
        payload: key
    }
}

export const createJson = () => dispatch => {
    dispatch({ type: CREATE_JSON });
    dispatch({ type: OPEN, payload: "download" });
}



