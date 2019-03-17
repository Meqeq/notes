import { LOGIN, NOT_LOGGED } from '../actions/userActions';

const initialState = {
    logged: false,
    name: "",
    surname: "",
    display: "",
    loading: true
};

export default ( state = initialState, {type, payload} ) => {
    switch(type) {
        case LOGIN: 
            return {
                ...state,
                logged: true,
                name: payload.name,
                surname: payload.surname,
                display: payload.display,
                loading: false
            }
        case NOT_LOGGED:
            return {
                ...initialState,
                loading: false
            }
        default:
            return state;
    }
}