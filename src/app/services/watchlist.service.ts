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
    'APIPublicID': environment.APIPublicID,
    'RefreshToken': localStorage.getItem('refresh-token')
  })
};
var headers_object = new HttpHeaders(
  {
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa(environment.username+':'+environment.password),
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
 
  getUsers (token , page): Observable<User[]> {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+token,
        'SecurityType': environment.SecurityType,
        'APIPublicID': environment.APIPublicID
      })
    };
    return this.http.get<User[]>('/api/Watchlists?OrganizationSys='+environment.OrganizationSys+'&FilterInfo.watchList=true&page='+page, httpOptions).pipe(
      tap( // Log the result or error
        data => data,
                error =>  error)
      )
  }

  getToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    return this.http.get('/api/authorize', authhttpOptions)
  }
  getTokenFromRefreshToken(token,refreshToken){
    var headers_refresh_token = new HttpHeaders(
      {
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token,
        'RefreshToken': refreshToken,
        'SecurityType': environment.SecurityType,
        'APIPublicID': environment.APIPublicID
      }
    );
    return this.http.get('/api/authorize', {
      headers: headers_refresh_token
    })
  }

  saveUsers (user: User): Observable<User> {
    return this.http.post<User>('/api/Watchlists?OrganizationSys='+environment.OrganizationSys, user, httpOptions)
  }

  deleteUser (id: number): Observable<{}> {
    const url = `${this.usersUrl}/${id}`; 
    return this.http.delete(`/api/Watchlists/${id}?OrganizationSys=`+environment.OrganizationSys, httpOptions)
  }

  updateUser (user: User): Observable<User> {
    return this.http.put<User>(`/api/Watchlists/${user.WatchListSys}?OrganizationSys=`+environment.OrganizationSys, user, httpOptions)
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
