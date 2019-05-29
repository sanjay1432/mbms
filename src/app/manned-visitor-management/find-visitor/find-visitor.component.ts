import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors,Validators, ValidatorFn } from '@angular/forms';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
import { WatchlistService } from '../../services/watchlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
export const atLeastOne = (validator: ValidatorFn) => (
  group: FormGroup,
): ValidationErrors | null => {
  const hasAtLeastOne =
    group &&
    group.controls &&
    Object.keys(group.controls).some(k => !validator(group.controls[k]));

  return hasAtLeastOne ? null : { atLeastOne: true };
};
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
    FirstName: [''],
    LastName: [''],
    Company: [''],
  }, { validator: atLeastOne(Validators.required) });
  watchlistusers;
  visitors;
  exactMatch: boolean = false;
  exactMatchUsers: any;
  possibleMatch: boolean = false;
  possibleMatchUsers: any = [];
  exactWatchListMatch: boolean;
  topResult: boolean;
  possibleUsersList: any = [];
  possibleMatchFound: boolean = false;
  results = "Search Results";
  gridList = 'col-sm-6'
  selectedColor = 'white';
  isGrid: boolean = true;
  hasWatchlistUser: boolean = false;
  admin: any;
  selectedIndex: any;
  selectedTopIndex = 0;
  topClass = "#122d51"
  topClasstext: string = "white";
  visitorToSave: any = null;
  hasSelecteduser: boolean;
  loading:boolean = false;
  constructor(private fb: FormBuilder,
              private watchlistService: WatchlistService,
              private mannedVisitorMangementService: MannedVisitorMangementService,
              private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getWatchListUsers()
    // this.getVisitors()
  }
  
  selectTop(i, user){
    this.hasSelecteduser = true;
    this.visitorToSave = user
    // this.topClass = "#122d51"
    // this.topClasstext = "white"
    this.selectedTopIndex = i
    // this.selectedIndex = i;
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
    this.watchlistService.getUsers(localStorage.getItem('token'),0).subscribe(user =>  {
      let watchlistusers = JSON.parse(JSON.stringify(user))
      this.watchlistusers = watchlistusers.Data})
  }
 

  async onSubmit() {
    let user = this.profileForm.value;
    let watchlist = this.watchlistusers;
   
    // console.log('Selected Visitor', user)
    this.possibleMatchUsers = []
    this.exactMatch = false;
    // if(user.firstName != '' && user.lastName === '' && user.company ===''){
    //   this.possibleMatch = false;
    // }
    // if(user.firstName ==='' && user.company !='' && user.lastName ===''  ){
    //   this.possibleMatch = false;
    // }
    // if(user.company ==='' && user.firstName ==='' && user.lastName !='' ){
    //   this.possibleMatch = false;
    // }
    // if(user.firstName ==='' && user.lastName !='' && user.company !=''){
    //   this.possibleMatch = true;
    // }
    // if(user.firstName !='' && user.lastName ==='' && user.company !=''){
    //   this.possibleMatch = true;
    // }
    // if(user.firstName !='' && user.lastName !='' && user.company ===''){
    //   this.possibleMatch = true;
    // }
    // if(user.firstName !='' && user.lastName !='' && user.company !=''){
    //   this.possibleMatch = true;
    //   this.topResult = true;
    // }
    this.loading = true
    this.mannedVisitorMangementService.getVisitors(user.FirstName, user.LastName, user.Company)
    .subscribe(data => { 
      this.loading = false
          let VisitorUsers = JSON.parse(JSON.stringify(data))
          this.visitors = VisitorUsers.Data.TopResults
          let possibleVisitor = VisitorUsers.Data.PossibleMatches
            // console.log('isPreRegistered',this.isPreRegistered)
          let pvisitors = possibleVisitor.filter((v)=>v.IsPreRegistration ===this.isPreRegistered);
              // console.log('possiblePreRegVisitor',possibleVisitor)
          // let visitors = this.visitors.filter((v)=>v.IsPreRegistration ===this.isPreRegistered);
          // visitors.filter((e)=>{
          //   if(e.FirstName === user.firstName && e.LastName === user.lastName && e.Company === user.company){
          //   this.exactMatch = true;
          //   this.exactMatchUser = e;
          //   this.results ="Top Result(s)"
          //   }
          //   if(e.FirstName === user.firstName || e.LastName === user.lastName || e.Company === user.company){
          //   this.possibleMatchFound = true;
          //   this.possibleMatchUsers.push(e);
          //   }
          // })
      
          // this.possibleMatchUsers.filter((possible)=>{
          //   watchlist.forEach(watchlistuser => {
      
          //     if(possible.FirstName === watchlistuser.FirstName || possible.LastName === watchlistuser.LastName || possible.Company === watchlistuser.Company){
          //       possible['isInWatchlist'] = true;
          //       this.hasWatchlistUser = true;
          //     }
          //   });
          // })
          if(this.visitors.length>0){
            this.exactMatch = true;
            this.visitorToSave = this.visitors[0]
            this.exactMatchUsers = this.visitors;
            this.results ="Top Result(s)"
          }
          if(pvisitors.length>0){
            this.possibleMatch = true;
            this.possibleMatchFound = true;
            this.possibleMatchUsers = pvisitors;
          }
      
          if(!this.exactMatch && !this.possibleMatchFound){
            this.router.navigate(['/mannedvisitormanagement/visitor'])
      
            let visitor = {
              profile: this.profileForm.value,
              isPreRegistered: this.isPreRegistered
            }
            // console.log('Selected Visitor', visitor)
            this.mannedVisitorMangementService.setVisitor(visitor)
          }
    },
    (error)=>{
      console.log(error.error.Message)
      this._snackBar.open(error.error.Message, '☹', {
        duration: 4000,
      })
    }) 
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
    if(this.visitorToSave.WatchList){
      let element:HTMLElement = document.getElementById('isInWatchList') as HTMLElement;
      element.click();
    }else{
        
      let visitor = {
        profile: this.visitorToSave?this.visitorToSave:this.profileForm.value,
        isPreRegistered: this.isPreRegistered
      }
      this.mannedVisitorMangementService.setVisitor(visitor)
      this.router.navigate(['/mannedvisitormanagement/visitor'])

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
    if(this.visitorToSave.WatchList){
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
    // this.topClass = 'white'
    // this.topClasstext = 'black'
  }


  onAddToVisitors(newVis){

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
