import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../services/auth/auth.service';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  validateForm!: FormGroup;

  // inject the formBuilder to build the reactive Form
  constructor(private fb: FormBuilder, 
    private authService: AuthService, // to call the Api
  private notification: NzNotificationService,// to notificate the users
private router: Router // To navigate between Components 
){ 
  }

  //mention the control of the Form
  ngOnInit(){

    // using "fb" to build our form (validateForm)
    this.validateForm = this.fb.group({
      username:[null, [Validators.required]],
      password: [null, [Validators.required]],
      


    })

  }

  submitForm(){
    // call the AuthService and login the client with the form.value
  
    this.authService.login(this.validateForm.get(['username'])!.value, this.validateForm.get(['password'])!.value).subscribe(res =>{ // handle the response(res) with the subscribe method
    

    
    console.log(res);
    //if client navigate to client dashboard
    if(UserStorageService.isClientLoggedIn()){
      this.router.navigateByUrl('client/dashboard')
    }
    //if company navigate to company dashboard
    else if(UserStorageService.isCompanyLoggedIn()){
      this.router.navigateByUrl('company/dashboard')
    }

}, error =>{

  this.notification// notify the user
    .error(
      'ERROR',
      'Bad Credentials',
      {nzDuration: 5000}
    );
    console.log ("error:", error);

});
     
  }

  


}
