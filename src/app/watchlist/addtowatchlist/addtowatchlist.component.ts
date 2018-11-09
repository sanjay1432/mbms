import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { FormGroup, FormControl } from '@angular/forms';
import { WatchlistpageComponent } from '../watchlistpage/watchlistpage.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  providers:[WatchlistpageComponent ],
  selector: 'app-addtowatchlist',
  templateUrl: './addtowatchlist.component.html',
  styleUrls: ['./addtowatchlist.component.css']
})
export class AddtowatchlistComponent implements OnInit {
  @Output() changedFocus : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() closeModal : EventEmitter<boolean> = new EventEmitter<boolean>();
  userForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    image: new FormControl(''),
    company: new FormControl(''),
    comment: new FormControl(''),
  });
  simlarUsers:boolean = false;
   element:HTMLElement = document.getElementById('close') as HTMLElement;
  constructor(private watchlistService: WatchlistService, private watchlistpageComponent: WatchlistpageComponent,private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    let user  = this.userForm.value;
     if(user.image == ''){
       user['image'] = 'no-image.jpg'
     }

     
     let that = this;
     this.checkExistUsers(user, function(data){
        console.log(data)

        if(data.length == 0){
          that.watchlistService.saveUsers(user).subscribe(
            user => {
              // console.log(user)
              that.watchlistpageComponent.closeModalDialog()
              that.element.click();
              that.userForm.reset();
              
            })
        }else{
          // that.simlarUsers = data;

          // console.log(that.simlarUsers)
          let info = {
            newUser: user,
            existing:data
          }
          that.changedFocus.emit(true);
          that.watchlistService.setsimilarUser(info) 
          that.simlarUsers =true
          // that.router.navigate(['/watchlist/matched'])
          // element.click();
        }
     })
   
  }

  checkExistUsers(user, callback){
   
    this.watchlistService.getUsers().subscribe(users =>  { 
    let similaruser =   users.filter(obj =>{ 
        if(obj.firstName == user.firstName){
           return obj;
        }
      });
      callback(similaruser);
    })
  }
  onexistuser(e){
    this.simlarUsers =false
    this.closeModal.emit(true);
  }

}
