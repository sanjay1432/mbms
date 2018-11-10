import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WatchlistService } from '../../services/watchlist.service';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  @Input() user;
  @Output() closeModal : EventEmitter<boolean> = new EventEmitter<boolean>();
  userForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      image: new FormControl(''),
      company: new FormControl(''),
      comment: new FormControl(''),
    });
  isloaded: boolean = false;
  
  constructor( private watchlistService: WatchlistService) { 
    

  }
  ngDoCheck(){
    if(this.user && !this.isloaded){
      this.isloaded = true;
      this.userForm.controls['id'].setValue(this.user.id);
      this.userForm.controls['firstName'].setValue(this.user.firstName);
      this.userForm.controls['lastName'].setValue(this.user.lastName);
      this.userForm.controls['image'].setValue(this.user.image);
      this.userForm.controls['company'].setValue(this.user.company);
      this.userForm.controls['comment'].setValue(this.user.comment);
    }
  }


  ngOnInit() {
  }

  onSubmit(){
    let user  = this.userForm.value;
    let element:HTMLElement = document.getElementById('close1') as HTMLElement;
    
    this.watchlistService.updateUser(user).subscribe((user)=>{
      element.click();     
      this.closeModal.emit(true)
      this.isloaded = false;  
      this.userForm.reset();
     }
    )
  }
}
