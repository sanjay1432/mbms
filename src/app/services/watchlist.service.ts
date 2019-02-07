import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../users';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer '+environment.token,
    'SecurityType': environment.SecurityType,
    'APIPublicID': environment.APIPublicID
  })
};
@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  usersUrl = 'api/users';  // URL to web api
  sUser = [];
  
  constructor(private http: HttpClient) { }
  getsimilarUser(): any {
      return this.sUser;
  }

  setsimilarUser(user: any) {
      this.sUser = user;
  }
 
  // getUsers (): Observable<User[]> {
  //   return this.http.get<User[]>(this.usersUrl)
  // }
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>('/api/UserWatchList?OrganizationSys='+environment.OrganizationSys, httpOptions).pipe(
      tap( // Log the result or error
        data => data,
                error =>  error)
      )
    // );
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
