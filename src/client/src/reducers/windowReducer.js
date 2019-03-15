import { OPEN, CLOSE } from '../actions/windowActions';

const initialState = {
    open: false,
    component: ""
};

export default ( state = initialState, {type, payload} ) => {
    switch(type) {
        case OPEN:
            return {
                open: true,
                component: payload
            }
        case CLOSE: 
            return {
                open: false,
                component: ""
            }
        default:
            return state;
    }
}