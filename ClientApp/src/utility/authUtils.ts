import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

export const loginUser = (jwt: string) => {
    Cookies.set('jwt', jwt, {
        secure: true,
        sameSite: 'strict'
    });
}

export const logoutUser = () => {
    Cookies.remove('jwt');
}

export const readUser = () => {
    const jwt = Cookies.get('jwt');
    if (jwt != null) {
        var decoded = jwt_decode(jwt);
        return decoded;
    } else {
        return null
    }
}

export const checkUser = () => {
    return Cookies.get('jwt') != null;
}