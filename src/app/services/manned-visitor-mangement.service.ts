import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Visitor } from '../visitors';
import { Host } from '../hosts';
import { User } from '../users';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { tap, map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('token'),
    'SecurityType': environment.SecurityType,
    'APIPublicID': environment.APIPublicID,
    'RefreshToken': localStorage.getItem('refresh-token')
  })
};
@Injectable({
  providedIn: 'root'
})
export class MannedVisitorMangementService {
  private visitor = new BehaviorSubject<object>({});
  private visitorProfile = new BehaviorSubject<object>({});
  private finalvisitorProfile = new BehaviorSubject<object>({});
  visitorsUrl = 'api/visitors';  // URL to web api
  hostsUrl = 'api/hosts';  // URL to web api
  constructor(private http: HttpClient) { }

  getVisitors (firstName, lastName, company): Observable<Visitor[]> {
    return this.http.get<Visitor[]>('/api/Visitor?firstName='+firstName+'&lastName='+lastName+'&company='+company, httpOptions)
  }
  getFinalVisitor(): Observable<any> { 
    var retrievedObject = localStorage.getItem('visitor');
      return JSON.parse(retrievedObject); 
  }
  setFinalVisitor(visitor: Object) { 
    localStorage.setItem('visitor', JSON.stringify(visitor));
  }
    //Set Badge value Active/Not
  getPrintBadgeState() { 
    var retrievedObject = localStorage.getItem('active');
      return retrievedObject; 
  }
  setPrintBadgeState(active: string) { 
    localStorage.setItem('active', active);
  }


  getHosts (): Observable<Host[]> {
    return this.http.get<Host[]>(this.hostsUrl)
  }

  getAPIHosts (id){
    return this.http.get('/api/Host/'+id, httpOptions)
  }
  saveVisitors (visitor: Visitor): Observable<Visitor> {
    return this.http.post<Visitor>(this.visitorsUrl, visitor, httpOptions)
  }
  saveAPIVisitors (visitor){
    return this.http.post('/api/VisitorSignIn', visitor, httpOptions)
  }
  updateAPIVisitors (visitor, ContactSys){
    return this.http.put('/api/VisitorSignIn/'+ContactSys, visitor, httpOptions)
  }
  setVisitor(visitor: Object) { 
    this.visitor.next(visitor); 
  } 
  getVisitor(): Observable<any> { 
      return this.visitor.asObservable(); 
  }


  setVisitorProfile(visitor: Object) { 
    this.visitorProfile.next(visitor); 
  } 
  getVisitorProfile(): Observable<any> { 
      return this.visitorProfile.asObservable(); 
  }

  getQuestionProfile () {
    return this.http.get<User[]>('/api/QuestionProfiles?OrganizationSys='+environment.OrganizationSys, httpOptions).pipe(
      tap( // Log the result or error
        data => data,
                error =>  error)
      )
    // );
  }
  getQuestions (questionProfileSys) {
    return this.http.get<User[]>('/api/Questions/'+questionProfileSys, httpOptions).pipe(
      tap( // Log the result or error
        data => data,
                error =>  error)
      )
  }

  getQuestionAnswers (questionProfileSys, ContactSys) {
    return this.http.get('/api/Questions/'+questionProfileSys+'/'+ContactSys, httpOptions)
    .pipe(
      tap( // Log the result or error
        data => data,
                error =>  error)
      )
  }
}
