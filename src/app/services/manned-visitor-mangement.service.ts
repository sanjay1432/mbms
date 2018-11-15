import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Visitor } from '../visitors';
import { Host } from '../hosts';
import { User } from '../users';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class MannedVisitorMangementService {
  private visitor = new BehaviorSubject<object>({});
  visitorsUrl = 'api/visitors';  // URL to web api
  hostsUrl = 'api/hosts';  // URL to web api
  constructor(private http: HttpClient) { }

  getVisitors (): Observable<Visitor[]> {
    return this.http.get<Visitor[]>(this.visitorsUrl)
  }

  getHosts (): Observable<Host[]> {
    return this.http.get<Host[]>(this.hostsUrl)
  }

  saveVisitors (visitor: Visitor): Observable<Visitor> {
    return this.http.post<Visitor>(this.visitorsUrl, visitor, httpOptions)
  }

  setVisitor(visitor: Object) { 
    this.visitor.next(visitor); 
  } 
  getVisitor(): Observable<any> { 
      return this.visitor.asObservable(); 
  }
}
