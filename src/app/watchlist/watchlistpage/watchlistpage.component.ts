import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-watchlistpage',
  templateUrl: './watchlistpage.component.html',
  styleUrls: ['./watchlistpage.component.css']
})
export class WatchlistpageComponent implements OnInit {
  users:any;
  private focused : boolean;
  modalClassName;
  
  constructor(private watchlistService:WatchlistService,private router: Router) {
    
   }

  ngOnInit() {
    this.getUsersList()
  }

  onSimUser(e){
    this.modalClassName = "modal-xl";
  }
  onclose(e){
   
    let element:HTMLElement = document.getElementById('close') as HTMLElement;
    element.click();
    this.modalClassName = "";
  }


  getUsersList(){
    this.watchlistService.getUsers().subscribe(user =>  this.users = user)
  }
  closeModalDialog(){
        let element:HTMLElement = document.getElementById('reload') as HTMLElement;
        element.click();
  }
  onRemove(id){
    var removeIndex = this.users.map(function(user) { return user.id; })
                       .indexOf(id);
                      this.users.splice(removeIndex, 1)
    this.watchlistService.deleteUser(id).subscribe(
      user => 
      this.getUsersList()   
     );
  }

}
