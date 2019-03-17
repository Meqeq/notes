import request from '../modules/request';

export const LOGIN = "user:login";
export const NOT_LOGGED = "user:notLogged";

export const logged = () => dispatch => {
    request("/api/logged").then(res => {
        //console.log(res);
        if(res.logged) dispatch({ type: LOGIN, payload: {...res} });
        else dispatch({ type: NOT_LOGGED });
    });
}