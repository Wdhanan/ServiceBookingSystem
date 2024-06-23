import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.scss']
})
export class AllAdsComponent {

  ads:any; // list of ads

  constructor (private companyService: CompanyService){

  }

  //Actualise the list each time
  ngOnInit(){
    this.getAllAdsByUserId();

  }



  getAllAdsByUserId(){
    this.companyService.getAllAdsByUserId().subscribe(res =>{
      this.ads = res;

    });
  }

  updateImg(img){
    return 'data:image/jpeg;base64,' + img;
  }

}
