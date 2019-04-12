import { Component, OnInit } from '@angular/core';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import { WatchlistService } from '../../services/watchlist.service';
import { User } from '../../users';
import { PrinterService } from '../../services/printer.service';


@Component({
  selector: 'app-batch-print',
  templateUrl: './batch-print.component.html',
  styleUrls: ['./batch-print.component.css']
})

export class BatchPrintComponent implements OnInit {

 
  printers;
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
              private watchlistService:WatchlistService,
              private printService: PrinterService) { }

  ngOnInit() {
    this.printService.getPrinters().subscribe(
      printers => this.printers = printers)
   this.visitor =  this.mannedVisitorMangementService.getFinalVisitor()
   this.watchlistService.getUsers(localStorage.getItem('token')).subscribe(user =>{
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
