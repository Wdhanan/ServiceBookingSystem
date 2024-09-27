import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const BASIC_URL = 'http://localhost:8080/';  // url of our Springboot Backend

export const AUTH_HEADER ='Authorization';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // inject the HttpClient to be able to communicate with our Backend
  constructor(private http : HttpClient,
    private userServiceStorage: UserStorageService // inject the UserStorageService
  ) { }

  //sign-up Method for client
  registerClient(signupRequestDTO:any): Observable<any>{
    return this.http.post(BASIC_URL + "client/sign-up", signupRequestDTO); 

  }
  //sign-up Method for company
  registerCompany(signupRequestDTO:any): Observable<any>{
    return this.http.post(BASIC_URL + "company/sign-up", signupRequestDTO); 

  }

  //login- Method
  login (username:string, password:string){
    return this.http.post(BASIC_URL + "authenticate", {username, password}, {observe: 'response'})
    .pipe( // to perform some operations
        map((res: HttpResponse<any>) =>{

          console.log(res.body) // with the body we can get the userId and the Role

          //store the userId and role in our storage, when the user login
          this.userServiceStorage.saveUser(res.body);

          //calculate the token length with the Authorization
          const tokenLength = res.headers.get(AUTH_HEADER)?.length;
          const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7, tokenLength);// avoid the "bearer " at the beginning
          console.log(bearerToken);
          //store the token in our storage, when the user login
          this.userServiceStorage.saveToken(bearerToken);
          return res;

        })); 
  }


  isTokenNotValid(): boolean{
    return !this.isTokenValid();

  }

  isTokenValid():boolean{
    // get the token
    const token = UserStorageService.getToken();
    if(!token){
      return false;
    }
    //decode the token
    const jwtHelper = new JwtHelperService(); // from the dependency we installed
    const isTokenExpired = jwtHelper.isTokenExpired(token);

    if (isTokenExpired){
      localStorage.clear();
      return false;
    }
    return  true;

}

  

}
