import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit{

  bookedService: any;
  constructor(private clientService: ClientService){

  }

  // get the reponse from the Api when the components get loaded
  ngOnInit(){
    this.getMyBookings();

  }


  getMyBookings(){

    this.clientService.getMyBookings().subscribe(res =>{
      this.bookedService = res;
    })

  }

}
