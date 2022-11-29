import {$authHost} from "./index";
import jwt_decode from "jwt-decode";

export const login = async (email, password) => {
    return $authHost.post('api/user/login', { email, password });
}
export const registration = async (email, password) => {
    return $authHost.post('api/user/registration', { email, password });
}
export const logout = async() => {
    return $authHost.post('api/user/logout');
}
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data)
}
export const checkAuth = async () =>{
    return $authHost.get(`api/user/refresh`, { withCredentials: true });
}

