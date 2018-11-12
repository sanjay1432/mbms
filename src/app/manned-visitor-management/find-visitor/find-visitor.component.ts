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
  exactMatch: boolean = false;
  exactMatchUser: any;
  possibleMatch: boolean = false;
  possibleMatchUsers: any = [];
  exactWatchListMatch: boolean;
  topResult: boolean;
  possibleUsersList: any = [];
  possibleMatchFound: boolean;
  results = "Search Results";
  gridList = 'col-sm-6'
  isGrid: boolean = true;
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
    this.possibleMatchUsers = []
    if(user.firstName != '' && user.lastName === '' && user.company ===''){
      this.possibleMatch = false;
    }
    if(user.firstName ==='' && user.company !='' && user.lastName ===''  ){
      this.possibleMatch = false;
    }
    if(user.company ==='' && user.firstName ==='' && user.lastName !='' ){
      this.possibleMatch = false;
    }
    if(user.firstName ==='' && user.lastName !='' && user.company !=''){
      this.possibleMatch = true;
    }
    if(user.firstName !='' && user.lastName ==='' && user.company !=''){
      this.possibleMatch = true;
    }
    if(user.firstName !='' && user.lastName !='' && user.company ===''){
      this.possibleMatch = true;
    }
    if(user.firstName !='' && user.lastName !='' && user.company !=''){
      this.possibleMatch = true;
      this.topResult = true;
    }
    visitors.filter((e)=>{
      if(e.firstName === user.firstName && e.lastName === user.lastName && e.company === user.company){
      this.exactMatch = true;
      this.exactMatchUser = e;
      this.results ="Top Result(s)"
      }
      if(e.firstName === user.firstName || e.lastName === user.lastName || e.company === user.company){
      this.possibleMatchFound = true;
      console.log(e)
      this.possibleMatchUsers.push(e);
      }
    })

    this.possibleMatchUsers.filter((possible)=>{
      watchlist.forEach(watchlistuser => {

        if(possible.firstName === watchlistuser.firstName || possible.lastName === watchlistuser.lastName || possible.company === watchlistuser.company){
          possible['isInWatchlist'] = true;
          // this.possibleUsersList.push(possible);
          // console.log(this.possibleUsersList)
        }
      });
    })
    console.log(this.possibleMatchUsers)
  }

  onGrid(){
    this.gridList = 'col-sm-6'
    this.isGrid = true;
  }
  onList(){
    this.gridList = 'col-sm-12'
    this.isGrid = false;
  }

}
