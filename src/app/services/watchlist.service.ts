import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
export class WatchlistService {
  usersUrl = 'api/users';  // URL to web api
  constructor(private http: HttpClient) { }


  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
  }

  saveUsers (user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions)
  }

  deleteUser (id: number): Observable<{}> {
    const url = `${this.usersUrl}/${id}`; 
    return this.http.delete(url, httpOptions)
  }

  updateUser (user: User): Observable<User> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.put<User>(this.usersUrl, user, httpOptions)
  }
}
