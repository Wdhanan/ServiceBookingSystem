import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';


export const GuardGuard:  CanActivateFn = () => { // for this case we dont need the parameters (route, state) 

  // inject the tokenservice
  const authservice = inject(AuthService); // we use inject() because we can not have the constructor here
  const router = inject(Router);
  // if the token is not valid we navigate the user to the login page
  if( authservice.isTokenNotValid() ){

    router.navigate(['login']);

    return false; // the guard return a boolean value

  }
  return true;
};
