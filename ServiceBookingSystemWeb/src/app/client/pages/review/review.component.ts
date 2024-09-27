import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from 'src/app/basic/components/services/storage/user-storage.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  bookId:number = this.activatedroute.snapshot.params['id'];
  validateForm!:FormGroup;

  constructor(private clientservice: ClientService,
    private activatedroute:ActivatedRoute, // get the book id from the url
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService
  ){

  }
  ngOnInit()  {
    //set the form control
    this.validateForm = this.fb.group({
      rating: [null, Validators.required],
      review: [null, Validators.required]
    })
    
  }

  giveReview(){
    const userId = UserStorageService.getUserId();
    if (!userId) {
      console.error('User ID is null or undefined');
    }

    

    

    const reviewDTO = {
      rating: this.validateForm.get("rating").value,
      review: this.validateForm.get("review").value,
      userId: UserStorageService.getUserId(),
      bookId: this.bookId

    }
    console.log('ReviewDTO:', reviewDTO);
    console.log('Book ID:', this.bookId);
    if (!this.bookId) {
  console.error('Book ID is missing from the URL');
  }


    this.clientservice.giveReview(reviewDTO).subscribe(res =>{
      console.log(res);
      this.notification// notify the user
      .success(
        'SUCCESS',
        'Review posted successfully',
        {nzDuration: 5000}
      );
      this.router.navigateByUrl("client/bookings");


    }, error =>{
      this.notification// notify the user
      .error(
        'ERROR',
        '$error.message',
        {nzDuration: 5000}
      );

    });
  }

}
