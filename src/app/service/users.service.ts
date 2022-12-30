import { Injectable } from '@angular/core';
import {UserLdap} from "../model/user-ldap";
import {LDAP_USERS} from "../model/ldap-mock-data";
import {Observable, of, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {InMemoryUsersService} from "./in-memory-users.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: UserLdap[] = LDAP_USERS;
  private static users: UserLdap[]; //for the observable

  private httpOptions = new HttpHeaders({'Content-Type': 'application/json'});

  private usersUrl = 'api/users';

  constructor(private http: HttpClient, private service: InMemoryUsersService) { }

  getUsers(): Observable<UserLdap[]>{
    console.log('Get user')
    console.log(this.http.get<UserLdap[]>(this.usersUrl));
    return this.http.get<UserLdap[]>(this.usersUrl);
  }

  getUser(id: number): Observable<UserLdap>{
    console.log("id passé en param : " + id)
    return this.http.get<UserLdap>(this.usersUrl + '/' + id);
  }

  addUser(user: UserLdap): Observable<UserLdap> {
    //call the method to generate an ID
    user.id = this.service.genId(this.users);
    return this.http.post<UserLdap>(this.usersUrl, user, {
      headers: this.httpOptions
    })
  }

  updateUser(user: UserLdap): Observable<UserLdap>{
    return this.http.put<UserLdap>(this.usersUrl + '/' + user.id, user, {headers: this.httpOptions})
  }

  deleteUser(id: number): Observable<UserLdap>{
    return this.http.delete<UserLdap>(this.usersUrl + '/' + id, {
      headers: this.httpOptions
    });
  }
}
