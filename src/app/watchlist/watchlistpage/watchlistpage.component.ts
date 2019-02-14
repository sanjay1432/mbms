import { Component, OnInit, ViewChild} from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator, MatSort} from '@angular/material';
import {MatTableDataSource} from '@angular/material';
import { User } from '../../users';
import {merge, Observable, of as observableOf} from 'rxjs';
// import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-watchlistpage',
  templateUrl: './watchlistpage.component.html',
  styleUrls: ['./watchlistpage.component.css']
})
export class WatchlistpageComponent implements OnInit {
  users:any = [];
  private focused : boolean;
  modalClassName;
  user: any;
  deletedID: any;
  values: string;
  
  displayedColumns: string[] = ['image','firstName', 'lastName', 'company', 'comment','edit','remove'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  modalImage: any;
  constructor(private watchlistService:WatchlistService,private router: Router) {
    watchlistService.getToken().subscribe(data=>{
      let token  =  JSON.parse(JSON.stringify(data));
     localStorage.setItem ('token', token.JWT);
   })
   }

  ngOnInit() {
    this.getUsersList()
    
  }
  openImageModal(imageurl){
    console.log(imageurl)
    this.modalImage = imageurl;
    let element:HTMLElement = document.getElementById('image') as HTMLElement;
        element.click();
  }
  applyFilter(filterValue: string) {
    if(this.dataSource.data){
    this.dataSource.filter = filterValue.trim();
    }
  }

  onSearch(v){
    this.values = v
    let found =[]
    this.users.filter((e)=>{
      if(e.firstName.includes(this.values) || e.lastName.includes(this.values)|| e.company.includes(this.values)){
        found.push(e)
      }
    })
    if(!this.values){
      this.getUsersList()
    }
    this.users = found; 

    //reload the data
    this.getDummy()
  }
  onKey(event) {
    this.values = event.target.value.toString() ;
    let found =[]
    this.users.filter((e)=>{
      if(e.firstName.includes(this.values) || e.lastName.includes(this.values)|| e.company.includes(this.values)){
        found.push(e)
      }
    })
    if(!this.values){
      this.getUsersList()
    }
    this.users = found; 

    //reload the data
    this.getDummy() 
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
    console.log(user)
    this.user = user;
    
    let element:HTMLElement = document.getElementById('openedit') as HTMLElement;
        element.click();
        // this.dataSource = user;
  }

  getDummy(){
    let element:HTMLElement = document.getElementById('dummy') as HTMLElement;
        element.click();
  }

  getUsersList(){
    this.watchlistService.getUsers().subscribe(data =>{
      
      let user = JSON.parse(JSON.stringify(data))
          user = user.Data;
          console.log(user)
      this.users = user
      this.dataSource = new MatTableDataSource<User>(user)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    )
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
    var removeIndex = this.users.map(function(user) { return user.UserWatchListSys; })
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
