import { Injectable } from '@angular/core';

// item to store or to get any  infos from the storage
const TOKEN ='s_token';
const USER = 's_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }


  //save token into storage

  public saveToken (token: string):void{
    window.localStorage.removeItem(TOKEN); // remove the existing token
    window.localStorage.setItem(TOKEN, token); // store the new token


  }

  static getToken():string {

    return localStorage.getItem(TOKEN); // fix the error in the tsconfig.json (strict: false)

  }

  // save the user in the storage service
  public saveUser (user):void{
    window.localStorage.removeItem(USER); // remove the existing user
    window.localStorage.setItem(USER, JSON.stringify(user)); // stringify and store the new user


  }

  // get the User
  static getUser():any {

    return JSON.parse(localStorage.getItem(USER)); // fix the error in the tsconfig.json (strict: false)

  }

  //get the UserId

  static getUserId():string {
    const user = this.getUser();

    if(user === null){ return '';}// if no user return nothing

    return user.userId;

  }

  //get userRole
  static getUserRole():string {
    const user = this.getUser();

    if(user === null){ return '';}// if no user return nothing

    return user.role;

  }

  // check if the client is logged In
  static isClientLoggedIn(): boolean {
    if (this.getToken() === null){
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'CLIENT';
  }

  // check if the company is logged In
  static isCompanyLoggedIn(): boolean {
    if (this.getToken() === null){
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'COMPANY';
  }

  //signout Method

  static signOut():void {
    // remove the token and user
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);

  }



}
