import { ADD_BLOCK, CHANGE, DELETE, CHANGE_ORDER, CREATE_JSON } from '../actions/noteActions';

const initialState = {
    title: "",
    blocks: [],
    createdAt: "",
    lastModify: "",
    json: ""
}


export default ( state = initialState, { type, payload } ) => {
    switch(type) {
        case ADD_BLOCK: 
            return {
                ...state,
                blocks: [ ...state.blocks, payload ]
            }
        case CHANGE:
            return {
                ...state,
                blocks: state.blocks.map( (element, key) => key === payload.key ? { ...element, content: payload.content } : element)
            }
        case DELETE:
            return {
                ...state,
                blocks: state.blocks.filter( (value, key) => { return key !== payload })
            }
        case CHANGE_ORDER:
            if((!payload.key && payload.direction === -1) || (payload.key === state.blocks.length - 1 && !payload.direction)) return state;
            return {
                ...state,
                blocks: state.blocks.map( (value, key, array) => {
                    if( payload.key + payload.direction === key ) return array[key + 1];
                    else if( payload.key + payload.direction + 1 === key ) return array[key - 1];
                    return value;
                })
            }
        case CREATE_JSON:
            return {
                ...state,
                json: new Buffer(JSON.stringify({ ...state, json: "" })).toString("base64")
            }
        default: 
            return state;
    }
}