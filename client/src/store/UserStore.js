import {makeAutoObservable} from 'mobx'
import {login, registration, logout, checkAuth} from '../http/userAPI'

export default class UserStore{
    constructor(){
        this._isAuth = false
        this._user = {}
        this._role = false

        makeAutoObservable(this)
    }
    get isAuth(){
        return this._isAuth
    }
    get isAdmin(){
        return this._role
    }
    userOrAdmin(role){
        this._role = role;
    }
    setIsAuth(bool) {
        this._isAuth = bool;
    }
    setUser(user) {
        this._user = user;
    }
    

    async login(email, password){
        try {
            const response = await login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user)
            if(response.data.user.isActivated)
            {
                this.setIsAuth(true)
            }
            
            if(response.data.user.role === "ADMIN")
                this.userOrAdmin(response.data.user.role)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async registration(email, password){
        try {
            const response = await registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user)
            if(response.data.user.isActivated)
            {
                this.setIsAuth(true);
            }
            if(response.data.user.role === "ADMIN")
                this.userOrAdmin(response.data.user.role)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
 
    async logout(){
        try {
            const response = await logout();
            localStorage.removeItem('token');
            this.setIsAuth(false)
            this.setUser({});
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
  
    async checkAuth() {
        try {
            const response = await checkAuth();
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            if(response.data.user.isActivated)
            {
                this.setIsAuth(true);
            }
            this.setUser(response.data.user);
            if(response.data.user.role === "ADMIN")
                this.userOrAdmin(response.data.user.role)
                
        }
        catch (e) {
            console.log(e.response?.data?.message);
        }
    }

}