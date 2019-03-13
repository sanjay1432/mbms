import { Component, OnInit  ,Input, Output, EventEmitter} from '@angular/core';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
@Component({
  selector: 'app-select-host',
  templateUrl: './select-host.component.html',
  styleUrls: ['./select-host.component.css']
})
export class SelectHostComponent implements OnInit {
  hosts: any;
  @Output() host : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() defaultValue;
  constructor(private mannedVisitorMangementService: MannedVisitorMangementService) { }

  ngOnInit() {
    this.getHosts()
    console.log(this.defaultValue)
    this.getAPiHosts(this.defaultValue)
  }

  getHosts(){
    this.mannedVisitorMangementService.getHosts().subscribe((hosts)=> this.hosts = hosts)
  }

  getAPiHosts(id){
    this.mannedVisitorMangementService.getAPIHosts(id).subscribe((hosts)=> {
      this.hosts = JSON.parse(JSON.stringify(hosts)).Data. ContactOption
      console.log(this.hosts)})
  }
  onSelectHost(host){
   this.host.emit(host);

  }

  onKey(event) {
      let values = event.target.value.toString() ;
      let found =[]
      this.hosts.filter((e)=>{
          var ContactName = e.ContactName.toLowerCase()
           values = values.toLowerCase()
        if(ContactName.includes(values)){
          found.push(e)
        }
      })
      if(!values){
        this.getAPiHosts(this.defaultValue)
      }

      this.hosts = found; 

      //reload the data
      this.getDummy() 
  }

  getDummy(){
    let element:HTMLElement = document.getElementById('dummy') as HTMLElement;
        element.click();
  }
}
