import { Component } from '@angular/core';
import { UserStorageService } from './basic/components/services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ServiceBookingSystemWeb';

  isClientLoggedIn: boolean = UserStorageService.isClientLoggedIn();
  isCompanyLoggedIn: boolean = UserStorageService.isCompanyLoggedIn();

  //inject the router
  constructor(private router: Router){}

  //check the routing changes  
  ngOnInit(){

    this.router.events.subscribe(event =>{
      this.isClientLoggedIn = UserStorageService.isClientLoggedIn();
      this.isCompanyLoggedIn = UserStorageService.isCompanyLoggedIn();

    })

  }

  // logout function to navigate the user to the login page
  logout (){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');// navigate to login page

  }
}
