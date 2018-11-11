import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Visitor } from '../visitors';
import { User } from '../users';
import { HttpHeaders } from '@angular/common/http';

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
  visitorsUrl = 'api/visitors';  // URL to web api
  constructor(private http: HttpClient) { }

  getVisitors (): Observable<Visitor[]> {
    return this.http.get<Visitor[]>(this.visitorsUrl)
  }
}
