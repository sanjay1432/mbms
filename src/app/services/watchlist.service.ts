import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../users';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('token'),
    'SecurityType': environment.SecurityType,
    'APIPublicID': environment.APIPublicID
  })
};
var headers_object = new HttpHeaders(
  {
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa("skumar:12345Test"),
    'SecurityType': environment.SecurityType,
    'APIPublicID': environment.APIPublicID
  }
);

const authhttpOptions = {
  headers: headers_object
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
 
  getUsers (): Observable<User[]> {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token'),
        'SecurityType': environment.SecurityType,
        'APIPublicID': environment.APIPublicID
      })
    };
    return this.http.get<User[]>('/api/UserWatchList?OrganizationSys='+environment.OrganizationSys+'&FilterInfo.watchList=true', httpOptions).pipe(
      tap( // Log the result or error
        data => data,
                error =>  error)
      )
  }

  getToken() {
    return this.http.get('/api/authorize', authhttpOptions).subscribe((data)=>{
      var tokens = JSON.parse(JSON.stringify(data))
      localStorage.setItem ('token', tokens.JWT);
      localStorage.setItem ('refresh-token', tokens.Refresh);
    })
  }

  saveUsers (user: User): Observable<User> {
    return this.http.post<User>('/api/UserWatchList?OrganizationSys='+environment.OrganizationSys, user, httpOptions)
  }

  deleteUser (id: number): Observable<{}> {
    const url = `${this.usersUrl}/${id}`; 
    return this.http.delete(`/api/UserWatchList/${id}?OrganizationSys=`+environment.OrganizationSys, httpOptions)
  }

  updateUser (user: User): Observable<User> {
    return this.http.put<User>(`/api/UserWatchList/${user.UserWatchListSys}?OrganizationSys=`+environment.OrganizationSys, user, httpOptions)
  }

  upload(file): Observable<Object> {
  
    var strImage = file.replace(/^data:image\/[a-z]+;base64,/, "");
      let d = {
        "ImageData": strImage,
        "ImageName": 'test.png'
      }
    return this.http.post(`/api/VisitorImage?OrganizationSys=`+environment.OrganizationSys, d, httpOptions);
  }
}
