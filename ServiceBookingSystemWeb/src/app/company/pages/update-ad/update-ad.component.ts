import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-update-ad',
  templateUrl: './update-ad.component.html',
  styleUrls: ['./update-ad.component.scss']
})
export class UpdateAdComponent {

  adId:any = this.activatedroute.snapshot.params['id']; // choose the right item to update due to his id

constructor(private companyService: CompanyService,
  private activatedroute: ActivatedRoute){
    
  }

  //each time this component is called the Id is getted
  ngOnInit(){
    this.getAdById();
  }

  getAdById(){
    this.companyService.getAdId(this.adId).subscribe( res =>{
      console.log(res);
    })

  }


}
