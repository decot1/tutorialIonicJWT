import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthoriies';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public setUsername(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName(): string {
    return window.sessionStorage.getItem(USERNAME_KEY);
  }

  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }
  public getAuthorities(): string[]{
    const roles: string[] = [];
    if(sessionStorage.getItem(AUTHORITIES_KEY)){
     JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach ( rol => {
       roles.push(rol);
     });  
    }
    return roles;
  }

 /* public getUserName(): string {
    let userName = '';
    if(this.getToken()) {
      const sub = jwt_decode(this.getToken()).sub;
      userName = sub;
    }
    return userName;
  }*/

  isAdmin(): boolean {
    if(this.getToken()) {
      const sub = jwt_decode(this.getToken()).sub;
      return (sub === 'admin');
    }
    return false;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}
