import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WatchlistService } from '../../services/watchlist.service';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  @Input() user;
  @Output() closeModal : EventEmitter<boolean> = new EventEmitter<boolean>();
  userForm = new FormGroup({
      ContactSys: new FormControl(''),
      UserWatchListSys: new FormControl(''),
      FirstName: new FormControl(''),
      LastName: new FormControl(''),
      image: new FormControl(''),
      Company: new FormControl(''),
      Comment: new FormControl(''),
    });
  isloaded: boolean = false;
  upload:boolean = false;
  imageurl: any;
  isFile: boolean;
  selectedupFile: any;
  constructor( private watchlistService: WatchlistService) { 
    

  }
  ngDoCheck(){
    if(this.user && !this.isloaded){
      this.isloaded = true;
      this.userForm.controls['ContactSys'].setValue(this.user.ContactSys);
      this.userForm.controls['UserWatchListSys'].setValue(this.user.UserWatchListSys);
      this.userForm.controls['FirstName'].setValue(this.user.FirstName);
      this.userForm.controls['LastName'].setValue(this.user.LastName);
      this.userForm.controls['image'].setValue(this.user.image);
      this.userForm.controls['Company'].setValue(this.user.Company);
      this.userForm.controls['Comment'].setValue(this.user.Comment);
    }
  }


  ngOnInit() {
  }

  onSubmit(){
    let user  = this.userForm.value;
    if(user.image == '' && this.imageurl == ''){
      user['image'] = 'no-image.jpg'
    }
    console.log(this.imageurl)
    user['imageurl'] = this.imageurl
    this.watchlistService.upload(this.imageurl).subscribe((data)=>{
       console.log(data)
        let image = JSON.parse(JSON.stringify(data))
        user['ImageSys'] = image.Data.ImageSys
        user['PhotoLocation'] = image.Data.PhotoLocation
        user['SmallPhotoLocation'] =  image.Data.SmallPhotoLocation
        this.watchlistService.updateUser(user).subscribe((user)=>{
        element.click();     
        this.closeModal.emit(true)
        this.isloaded = false;  
        this.userForm.reset();
      }
      )
    })
    let element:HTMLElement = document.getElementById('close1') as HTMLElement;
    
   
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
          console.log(file)
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
      const file: File = event.target.files[0];
      var reader = new FileReader();
       
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        console.log(event)
        this.selectedupFile = new ImageSnippet(event.target.result, file);
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
  onUpload(){
    this.upload = true;
  }
}
