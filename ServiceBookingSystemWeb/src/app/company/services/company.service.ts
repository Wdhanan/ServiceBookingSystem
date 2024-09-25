import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/basic/components/services/storage/user-storage.service';

const BASIC_URL = 'http://localhost:8080/';// Base Url for Company Controller

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  postAd( adDTO: any): Observable<any>{

    //get the UserId
    const userId = UserStorageService.getUserId();

    return this.http.post(BASIC_URL + 'api/company/ad/'+userId, adDTO, {
      headers: this.createAuthorizationHeader() // send the Token
    });


  }


  getAllAdsByUserId( ): Observable<any>{

    //get the UserId
    const userId = UserStorageService.getUserId();

    return this.http.get(BASIC_URL + 'api/company/ads/'+userId, {
      headers: this.createAuthorizationHeader() // send the Token
    });


  }

  // get One Ad
  getAdId(adId:any ): Observable<any>{

    

    return this.http.get(BASIC_URL + 'api/company/ad/'+adId, {
      headers: this.createAuthorizationHeader() // send the Token
    });


  }


  createAuthorizationHeader(): HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    )
  }
}
