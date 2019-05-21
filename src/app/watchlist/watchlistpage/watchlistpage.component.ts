import { Component, OnInit, ViewChild} from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator, MatSort} from '@angular/material';
import {MatTableDataSource} from '@angular/material';
import { User } from '../../users';
import {merge, Observable, of as observableOf} from 'rxjs';
import {PageEvent} from '@angular/material';
// import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-watchlistpage',
  templateUrl: './watchlistpage.component.html',
  styleUrls: ['./watchlistpage.component.css']
})
export class WatchlistpageComponent implements OnInit {
  users:any = [];
  tableUserLoaded : boolean = false;
  modalClassName;
  user: any;
  deletedID: any;
  values: string;
  loading = false;
  displayedColumns: string[] = ['image','firstName', 'lastName', 'company', 'comment','edit','remove'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  modalImage: any;
   // MatPaginator Output
   pageEvent: PageEvent;
  totalRecords: any;
  constructor(private watchlistService:WatchlistService,private router: Router) {
  
   }

   ngOnInit() {
    this.watchlistService.getToken().subscribe((data)=>{
      var tokens = JSON.parse(JSON.stringify(data))
      localStorage.setItem ('token', tokens.JWT);
      localStorage.setItem ('refresh-token', tokens.Refresh);
      this.getUsersList(0)
    })
    // setTimeout(()=>{ 
    //   this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    // }, 8000);
    
  }
  openImageModal(imageurl){
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
      this.getUsersList(0)
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
      this.getUsersList(0)
    }
    this.users = found; 

    //reload the data
    this.getDummy() 
  }

  onSimUser(e){
    this.modalClassName = "modal-xl";
  }
  onclose(e){
    this.getUsersList(0)
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

  getDummy(){
    let element:HTMLElement = document.getElementById('dummy') as HTMLElement;
        element.click();
  }
  onPageChange(e){
       console.log(e.pageIndex)
       this.getUsersList(e.pageIndex+1)
  }
  getUsersList(page){
    this.loading = true
    this.watchlistService.getUsers(localStorage.getItem('token'), page).subscribe(data =>{
      
      let user = JSON.parse(JSON.stringify(data))
      this.users = user.Data
      this.totalRecords = user.Metadata.Total
      this.dataSource = new MatTableDataSource(user.Data)
      this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      this.loading = false;
      this.tableUserLoaded = true
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
    console.log(id)
    this.watchlistService.deleteUser(id).subscribe(
      user => 
      this.getUsersList(0)   
     );
  }

}
