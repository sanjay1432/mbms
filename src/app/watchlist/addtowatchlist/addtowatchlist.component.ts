import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { FormGroup, FormControl } from '@angular/forms';
import { WatchlistpageComponent } from '../watchlistpage/watchlistpage.component';
@Component({
  providers:[WatchlistpageComponent ],
  selector: 'app-addtowatchlist',
  templateUrl: './addtowatchlist.component.html',
  styleUrls: ['./addtowatchlist.component.css']
})
export class AddtowatchlistComponent implements OnInit {
  userForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    image: new FormControl(''),
    company: new FormControl(''),
    comment: new FormControl(''),
  });

  constructor(private watchlistService: WatchlistService, private watchlistpageComponent: WatchlistpageComponent) { }

  ngOnInit() {
  }

  onSubmit(){
    let user  = this.userForm.value;
     if(user.image == ''){
       user['image'] = 'no-image.jpg'
     }

     let element:HTMLElement = document.getElementById('close') as HTMLElement;
     
    this.watchlistService.saveUsers(user).subscribe(
      user => {
        // console.log(user)
        this.watchlistpageComponent.closeModalDialog()
        element.click();
        
      })
  }

}
