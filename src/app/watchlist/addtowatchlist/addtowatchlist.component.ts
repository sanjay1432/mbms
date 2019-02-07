import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { WatchlistpageComponent } from '../watchlistpage/watchlistpage.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
@Component({
  providers:[WatchlistpageComponent ],
  selector: 'app-addtowatchlist',
  templateUrl: './addtowatchlist.component.html',
  styleUrls: ['./addtowatchlist.component.css']
})
export class AddtowatchlistComponent implements OnInit {
  @Output() changedFocus : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() closeModal : EventEmitter<boolean> = new EventEmitter<boolean>();
  userForm: FormGroup;
  
  simlarUsers:boolean = false;
  upload:boolean = false;
  imageurl: any;
  isFile: boolean;
  constructor(private watchlistService: WatchlistService, private watchlistpageComponent: WatchlistpageComponent,private router: Router) { }

  ngOnInit() {
    console.log(this.upload)
    this.userForm = new FormGroup({
      'id': new FormControl(''),
      'FirstName': new FormControl('', [
        Validators.required]),
      'LastName': new FormControl('', [
        Validators.required]),
      'image': new FormControl(''),
      'Company': new FormControl(''),
      'Comment': new FormControl(''),
    });
  }

  get fname() { return this.userForm.get('FirstName'); }
  get lname() { return this.userForm.get('LastName'); }
  onSubmit(){
    let user  = this.userForm.value;
     if(user.image == '' && this.imageurl == ''){
       user['image'] = 'no-image.jpg'
     }

     user['imageurl'] = this.imageurl

     
     let that = this;
     this.checkExistUsers(user, function(data){
        console.log(data)

        if(data.length == 0){
          that.watchlistService.saveUsers(user).subscribe(
            user => {
              // console.log(user)
              let element:HTMLElement = document.getElementById('close') as HTMLElement;
              element.click();
              that.watchlistpageComponent.closeModalDialog()
              
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
   
    this.watchlistService.getUsers().subscribe(data =>  { 
    let users = JSON.parse(JSON.stringify(data))

    let similaruser =   users.Data.filter(obj =>{ 
        if(obj.FirstName == user.FirstName){
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

  onUpload(){
    this.upload = true;
  }
  public files: UploadFile[] = [];
 
  public dropped(event) {
    if(event.files){
    for (const droppedFile of event.files) {
 
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
 
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          var reader = new FileReader();

          reader.readAsDataURL(file); // read file as data url
    
          reader.onload = (event:any) => { // called once readAsDataURL is completed
    
            console.log(event)
            this.imageurl = event.target.result;
            this.upload = false;
            this.isFile = true;
          }
 
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
 
        });
      } else {
        // // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
       console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }else{
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed

        console.log(event)
        this.imageurl = event.target.result;
        this.upload = false;
        this.isFile = true;
      }
    }
  }
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

}
