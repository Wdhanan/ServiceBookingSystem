import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent {

  selectedFile: File | null;  // to store the image of the Ad
  imagePreview: string | ArrayBuffer | null; // preview image  which is going to be shown to the user
  validateForm! : FormGroup;

  constructor(private fb: FormBuilder,
    private companyService: CompanyService, // to call the Api
  private notification: NzNotificationService,// to notificate the users
private router: Router
  ){

  }

  ngOnInit(){

    this.validateForm = this.fb.group({
      serviceName:[null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]]
    })

  }

  // method after the selection of the Image from the User
  onFileSelected(event: any){
    this.selectedFile = event.target.files[0]; // get the 0 index of the file to get the image
    this.previewImage(); // show the alt image

  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result; // set the preview Picture
    }
    reader.readAsDataURL(this.selectedFile);
  }

  // call the Api
  postAd(){
    const formData: FormData = new FormData(); // prepare the AdDTO
    formData.append('img', this.selectedFile); // image
    formData.append('serviceName', this.validateForm.get('serviceName').value); // serviceName
    formData.append('description', this.validateForm.get('description').value);// description
    formData.append('price', this.validateForm.get('price').value);// description

    // post with the Service

    this.companyService.postAd(formData).subscribe(res =>{

      this.notification // notify the user
    .success(
      'SUCCESS',
      'Ad posted successfully!',
      {nzDuration: 5000}
    );

    // redirect the User to se all the Ads
    this.router.navigateByUrl('/company/ads');



    }, error =>{

      this.notification// notify the user
    .error(
      'ERROR',
      'Ad was not inserted!',
      {nzDuration: 5000}
    );

    });

  }


}
