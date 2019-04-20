import { OPEN, CLOSE } from './windowActions';

export const ADD_BLOCK = "note:addBlock";
export const CHANGE = "note:onChange";
export const CHANGE_ORDER = "note:changeOrder";
export const DELETE = "note:delete";
export const CREATE_JSON = "note:createJson";
export const OPEN_NOTE = "note:open";
export const CLEAN = "note:clean";

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

export const openNote = (e, history) => dispatch => {
    let note = e.target.files[0];

    try {
        if(note.type !== "application/json") throw new Error("Nieprawidłowy format notatki");

        let fr = new FileReader();

        fr.addEventListener("load", () => {
            try {
                let result = JSON.parse(fr.result);

                dispatch({ type: OPEN_NOTE, payload: result });
                dispatch({ type: CLOSE });
                history.push("/note");
            } catch(e) {
                console.log(e);
            }
        });

        fr.readAsText(note);
        //console.log(kek);

        
    } catch(e) {
        console.log(e);
    }
}

export const openFromDropbox = (note, history) => dispatch => {
    dispatch({ type: OPEN_NOTE, payload: note });
    dispatch({ type: CLOSE });
    history.push("/note");
}

export const saveInLocal = () => (dispatch, getState) => {
    try {
        if(localStorage.getItem('note') === null) {
            let json = JSON.stringify(getState().note);
        
            localStorage.setItem('note', json);
        }
    } catch(e) {

    }
}

export const loadFromLocal = () => (dispatch, getState) => {
    try {
        let json = localStorage.getItem('note');
        if(json !== null) {
            dispatch({ type: OPEN_NOTE, payload: JSON.parse(json) });
        }
    } catch(e) {
        //console.log(e);
    }
}

export const umount = () => dispatch => {
    localStorage.removeItem('note');
    dispatch({ type: CLEAN });
}



