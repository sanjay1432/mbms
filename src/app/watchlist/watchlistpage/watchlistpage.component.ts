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
  user: any;
  deletedID: any;
  
  constructor(private watchlistService:WatchlistService,private router: Router) {
    
   }

  ngOnInit() {
    this.getUsersList()
  }

  onSimUser(e){
    this.modalClassName = "modal-xl";
  }
  onclose(e){
    this.getUsersList()
    let element:HTMLElement = document.getElementById('close') as HTMLElement;
    element.click();
    this.user = null;
    this.modalClassName = "";
  }
  onEdit(user){
    this.user = user;
    let element:HTMLElement = document.getElementById('openedit') as HTMLElement;
        element.click();
  }


  getUsersList(){
    this.watchlistService.getUsers().subscribe(user =>  this.users = user)
  }
  closeModalDialog(){
        let element:HTMLElement = document.getElementById('reload') as HTMLElement;
        element.click();
  }

  openDeleteModal(id){
    this.deletedID = id;
    let element:HTMLElement = document.getElementById('opendelete') as HTMLElement;
        element.click();
  }
  onRemove(id){
    var removeIndex = this.users.map(function(user) { return user.id; })
                       .indexOf(id);
                      this.users.splice(removeIndex, 1)
    let element:HTMLElement = document.getElementById('closeDel') as HTMLElement;
    element.click();
    this.watchlistService.deleteUser(id).subscribe(
      user => 
      this.getUsersList()   
     );
  }

}
