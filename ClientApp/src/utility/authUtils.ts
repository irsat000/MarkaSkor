import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

export const loginUser = (jwt: string) => {
    Cookies.set('jwt', jwt, {
        secure: true,
        sameSite: 'strict'
    });
}

export const logoutUser = (setUserData: any) => {
    Cookies.remove('jwt');
    setUserData(null);
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

export const readUserJwt = () => {
    return Cookies.get('jwt');
}

export const checkUser = () => {
    return Cookies.get('jwt') != null;
}