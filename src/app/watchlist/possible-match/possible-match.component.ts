import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { WatchlistpageComponent } from '../watchlistpage/watchlistpage.component';
@Component({
  providers:[WatchlistpageComponent ],
  selector: 'app-possible-match',
  templateUrl: './possible-match.component.html',
  styleUrls: ['./possible-match.component.css']
})
export class PossibleMatchComponent implements OnInit {
  newUser: any;
  existing: any;
  @Output() onExist : EventEmitter<boolean> = new EventEmitter<boolean>();
  element:HTMLElement = document.getElementById('close') as HTMLElement;

  constructor(private watchlistService: WatchlistService, private watchlistpageComponent: WatchlistpageComponent,) { }

  ngOnInit() {
   let users = this.watchlistService.getsimilarUser();
   this.newUser = users.newUser;
   this.existing = users.existing;
   console.log(users)
  }
  onAdd(user){
    this.watchlistService.saveUsers(user).subscribe(
      user => {
        this.watchlistpageComponent.closeModalDialog()
        this.element.click();
      })
  }

  onexistuser(){
    this.onExist.emit(true);
    // this.element.click();
  }

}
