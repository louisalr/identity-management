import { Injectable } from '@angular/core';
import {of} from "rxjs";

interface AuthenticationReponse{
  status: boolean,
  token: string,
  message: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  redirectUrl = '/';
  constructor() { }

  static isLoggedIn(){
    const token = AuthenticationService.getToken();
    console.log('token=' + token);
    return !!token && ! AuthenticationService.isTokenExpired(token);
  }

  static isTokenExpired(token: string){
    return false;
  }

  static setToken(idToken: string){
    sessionStorage.setItem('id_token', idToken);
  }

  static getToken(){
    return sessionStorage.getItem('id_token');
  }

  static logout(){
    sessionStorage.removeItem('id_token');
  }

  loginWithRole(username, password, role){
    const response: AuthenticationReponse
    = {status: true, message: 'HTTP 200', token: 'token'};
    AuthenticationService.setToken('token');
    return of(response)
  }
}
