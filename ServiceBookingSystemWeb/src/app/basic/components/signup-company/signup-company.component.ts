import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup-company',
  templateUrl: './signup-company.component.html',
  styleUrls: ['./signup-company.component.scss']
})
export class SignupCompanyComponent {

  validateForm!: FormGroup; // form

  // inject the formBuilder to build the reactive Form
  constructor(private fb: FormBuilder, 
    private authService: AuthService, // to call the Api
  private notification: NzNotificationService,// to notificate the users
private router: Router){ // To navigate between Components 

  }


  //mention the control of the Form
  ngOnInit(){

    // using "fb" to build our form (validateForm)
    this.validateForm = this.fb.group({
      email:[null, [Validators.email, Validators.required]],
      name: [null, [Validators.required]],
      adress: [null, [Validators.required]],
      phone: [null], // optional no Validators required
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required]]


    })

  }

  //SubmitForm method where we call our Backend Api

  submitForm(){
    // call the AuthService and register the company with the form.value
  
    this.authService.registerCompany(this.validateForm.value).subscribe(res =>{ // handle the response(res) with the subscribe method
    this.notification // notify the user
    .success(
      'SUCCESS',
      'Signup successfull',
      {nzDuration: 5000}
    );

    //navigate the user to the login Page with navigateByUrl from router
    this.router.navigateByUrl('/login');
}, error =>{

  this.notification// notify the user
    .error(
      'ERROR',
      '${error.error}',
      {nzDuration: 5000}
    );

});
     
  }

}

