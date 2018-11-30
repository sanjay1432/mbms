import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
import { WatchlistService } from '../../services/watchlist.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedColor = 'white';
  isGrid: boolean = true;
  hasWatchlistUser: boolean = false;
  admin: any;
  selectedIndex: any;
  topClass = "#122d51"
  topClasstext: string = "white";
  visitorToSave: any;
  hasSelecteduser: boolean;
  constructor(private fb: FormBuilder,
              private watchlistService: WatchlistService,
              private mannedVisitorMangementService: MannedVisitorMangementService,
              private router: Router) { }

  ngOnInit() {
    this.getWatchListUsers()
    this.getVisitors()
  }
  
  selectTop(){
    this.topClass = "#122d51"
    this.topClasstext = "white"
    this.selectedIndex = null
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
    this.exactMatch = false;
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
          this.hasWatchlistUser = true;
          // this.possibleUsersList.push(possible);
          // console.log(this.possibleUsersList)
        }
      });
    })

    if(!this.exactMatch && !this.possibleMatchFound){
      this.router.navigate(['/mannedvisitormanagement/visitor'])

      let visitor = {
        profile: this.profileForm.value,
        isPreRegistered: this.isPreRegistered
      }
      this.mannedVisitorMangementService.setVisitor(visitor)
    }
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


  onNext(){
    if(this.hasWatchlistUser){
      let element:HTMLElement = document.getElementById('isInWatchList') as HTMLElement;
      element.click();
    }else{
        this.router.navigate(['/mannedvisitormanagement/visitor'])
  
      let visitor = {
        profile: this.profileForm.value,
        isPreRegistered: this.isPreRegistered
      }
      this.mannedVisitorMangementService.setVisitor(visitor)
      }
    
    
    
  }
  isAdmin(e){
        if(!this.admin){
          this.admin = true
        }else{
          this.admin =false
        }
  }
  onConfirm(){
    if(this.hasWatchlistUser){
      let element:HTMLElement = document.getElementById('close') as HTMLElement;
          element.click();
          let element1:HTMLElement = document.getElementById('secondCheck') as HTMLElement;
          element1.click();
    }
  }

  onIgnore(){
     if(this.hasSelecteduser){
        let element:HTMLElement = document.getElementById('oknext') as HTMLElement;
        element.click();
        this.router.navigate(['/mannedvisitormanagement/visitor'])

        let visitor = {
          profile: this.visitorToSave,
          isPreRegistered: this.isPreRegistered
        }
        this.mannedVisitorMangementService.setVisitor(visitor)

      }else{
          let element:HTMLElement = document.getElementById('oknext') as HTMLElement;
                element.click();
          this.router.navigate(['/mannedvisitormanagement/visitor'])

          let visitor = {
            profile: this.profileForm.value,
            isPreRegistered: this.isPreRegistered
          }
          this.mannedVisitorMangementService.setVisitor(visitor)
        }
  }

  onSelectPossible(i, user){
    this.hasSelecteduser = true;
    this.visitorToSave = user
    this.selectedIndex = i;
    this.topClass = 'white'
    this.topClasstext = 'black'
  }


  onAddToVisitors(newVis){
    console.log(newVis.value)
    let element1:HTMLElement = document.getElementById('closeNewVis') as HTMLElement;
    element1.click();
    this.router.navigate(['/mannedvisitormanagement/visitor'])
    let visitor = {
      profile: newVis.value,
      isPreRegistered: this.isPreRegistered
    }
    this.mannedVisitorMangementService.setVisitor(visitor)
    // this.mannedVisitorMangementService.saveVisitors(this.visitorToSave)    
  }

  addNewVisitor(e){
    let element1:HTMLElement = document.getElementById('newVisitor') as HTMLElement;
          element1.click();

  }
}
