import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
import { WatchlistService } from '../../services/watchlist.service';
@Component({
  selector: 'app-find-visitor',
  templateUrl: './find-visitor.component.html',
  styleUrls: ['./find-visitor.component.css']
})
export class FindVisitorComponent implements OnInit {
  isPreRegistered = true;
  yesClass = 'yes';
  noClass  = 'no';
  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    company: [''],
  });
  watchlistusers;
  visitors;
  constructor(private fb: FormBuilder,
              private watchlistService: WatchlistService,
              private mannedVisitorMangementService: MannedVisitorMangementService) { }

  ngOnInit() {
    this.getWatchListUsers()
    this.getVisitors()
  }

  preRegister(value){
    if(value  === 'yes'){
      this.yesClass = value
      this.noClass = 'no'
      this.isPreRegistered = true;
    }else if(value  === 'no'){
      this.yesClass = value
      this.noClass = 'yes'
      this.isPreRegistered = false;
    }
    
  }

  getWatchListUsers(){
    this.watchlistService.getUsers().subscribe(user =>  this.watchlistusers = user)
  }
  getVisitors(){
    this.mannedVisitorMangementService.getVisitors().subscribe(user =>  this.visitors = user)
  }

  onSubmit() {
   let user = this.profileForm.value;
   let watchlist = this.watchlistusers;
   let visitors = this.visitors;
   console.log(user)
   console.log(watchlist)
   console.log(visitors)
  }

}
