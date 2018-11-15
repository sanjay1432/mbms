import { Component, OnInit  , Output, EventEmitter} from '@angular/core';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
@Component({
  selector: 'app-select-host',
  templateUrl: './select-host.component.html',
  styleUrls: ['./select-host.component.css']
})
export class SelectHostComponent implements OnInit {
  hosts: any;
  @Output() host : EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private mannedVisitorMangementService: MannedVisitorMangementService) { }

  ngOnInit() {
    this.getHosts()
  }

  getHosts(){
    this.mannedVisitorMangementService.getHosts().subscribe((hosts)=> this.hosts = hosts)
  }
  onSelectHost(host){
   this.host.emit(host);

  }

  onKey(event) {
      let values = event.target.value.toString() ;
      let found =[]
      this.hosts.filter((e)=>{
        if(e.firstName.includes(values) || e.lastName.includes(values)){
          found.push(e)
        }
      })
      if(!values){
        this.getHosts()
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
