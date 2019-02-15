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
    'Authorization': 'Bearer '+localStorage.getItem('token'),
    'SecurityType': environment.SecurityType,
    'APIPublicID': environment.APIPublicID
  })
};
var headers_object = new HttpHeaders(
  {
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa("skumar:12345"),
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
 
  // getUsers (): Observable<User[]> {
  //   return this.http.get<User[]>(this.usersUrl)
  // }
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>('/api/UserWatchList?OrganizationSys='+environment.OrganizationSys+'&FilterInfo.watchList=true', httpOptions).pipe(
      tap( // Log the result or error
        data => data,
                error =>  error)
      )
    // );
  }

  getToken() {
    return this.http.get('/api/authorize', authhttpOptions)
  }

  saveUsers (user: User): Observable<User> {
    return this.http.post<User>('/api/UserWatchList?OrganizationSys='+environment.OrganizationSys, user, httpOptions)
  }

  deleteUser (id: number): Observable<{}> {
    const url = `${this.usersUrl}/${id}`; 
    return this.http.delete(`/api/UserWatchList/${id}?OrganizationSys=`+environment.OrganizationSys, httpOptions)
  }

  updateUser (user: User): Observable<User> {
    console.log(user)
    // httpOptions.headers =
    //   httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.put<User>(`/api/UserWatchList/${user.UserWatchListSys}?OrganizationSys=`+environment.OrganizationSys, user, httpOptions)
  }

  upload(file): Observable<Object> {
    // const formData: FormData = new FormData();
    // formData.append('avatar', file, file.name);
    var strImage = file.replace(/^data:image\/[a-z]+;base64,/, "");
      let d = {
        "ImageData": strImage,
        "ImageName": 'test'
      }
    return this.http.post(`/api/VisitorImage?OrganizationSys=`+environment.OrganizationSys, d, httpOptions);
  }
  // public upload(image: File): Observable<Object> {
  //   const formData = new FormData();

  //   formData.append('ImageData', image);

  //   return this.http.post(`/api/VisitorImage?OrganizationSys=`+environment.OrganizationSys, formData, httpOptions);
  // }
}
