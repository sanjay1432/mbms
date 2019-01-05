import { Component, OnInit } from '@angular/core';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import { WatchlistService } from '../../services/watchlist.service';
import { User } from '../../users';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-batch-print',
  templateUrl: './batch-print.component.html',
  styleUrls: ['./batch-print.component.css']
})

export class BatchPrintComponent implements OnInit {

 
  printers = ['printer1','printer2','printer3']
  groups = ['Contractor 1','Contractor 2','Day Visitor','Delivery Person','Long Term Visitor']
  selectedItem: any = this.groups[0];
  visitor: any;

  yesBadge = 'yes';
  noBadge  = 'no';

  displayedColumns: string[] = ['select', 'firstName', 'lastName'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  constructor(private mannedVisitorMangementService:MannedVisitorMangementService,
              private watchlistService:WatchlistService) { }

  ngOnInit() {
   this.visitor =  this.mannedVisitorMangementService.getFinalVisitor()
   this.watchlistService.getUsers().subscribe(user =>{
     console.log(user)
     this.dataSource = new MatTableDataSource<User>(user)
   })
  }

  printBadge(value){
    if(value  === 'yes'){
      this.yesBadge = value
      this.noBadge = 'no'
     
    }else if(value  === 'no'){
      this.yesBadge = value
      this.noBadge = 'yes'
    
    }
    
  }

  listClick(event, newValue) {
      this.selectedItem = newValue; 
  }

}
