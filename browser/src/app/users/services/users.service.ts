import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '@env/environment';
import { first, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

enum ep {
  GetUsersList = '/users',
  AddUser = '/users',
  EditUser = '/users',
  DeleteUserById = '/users/'
}

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) { }

  users: Array<User> = [
    {
      id: 1,
      firstName: 'Elias',
      lastName: 'Scarborough',
      email: 'elias@wewritecode.com',
      age: 420
    },
    {
      id: 2,
      firstName: 'Levi',
      lastName: 'Rosol',
      email: 'levi@wewritecode.com',
      age: 1776
    },
    {
      id: 3,
      firstName: 'Tyler',
      lastName: 'Riker',
      email: 'tyler@wewritecode.com',
      age: 90210
    },
    {
      id: 4,
      firstName: 'Corey',
      lastName: 'McSparen',
      email: 'corey@wewritecode.com',
      age: 8675309
    },
    {
      id: 5,
      firstName: 'Mike',
      lastName: 'Clancy',
      email: 'mike@wewritecode.com',
      age: 666
    },
    {
      id: 6,
      firstName: 'Zach',
      lastName: 'Smith',
      email: 'zach@wewritecode.com',
      age: 1999
    }
  ];

  getUsersList$(): Observable<Array<User>> {
    return this.http
      .get<Array<User>>(environment.apiUrl + ep.GetUsersList)
      .pipe(first());
  }

  addUser$(user: User): Observable<User> {
    return this.http
      .post<User>(environment.apiUrl + ep.AddUser, user)
      .pipe(first());
  }

  editUser$(user: User): Observable<User> {
    return this.http
      .put<User>(environment.apiUrl + ep.EditUser, user)
      .pipe(first());
  }

  deleteUserById$(id: number): Observable<User> {
    return this.http
      .delete<User>(environment.apiUrl + ep.DeleteUserById + id)
      .pipe(first());
  }

  // MOCKED SERVICE METHODS

  mockGetUsersList$(): Observable<Array<User>> {
    return of(this.users).pipe(delay(500));
  }

  mockAddUser$(user: User): Observable<User> {
    const newUser = { ...user };
    newUser.id = this.users.length + 1;
    const newArr = Array.from(this.users);
    newArr.push(newUser);
    this.users = newArr;
    return of(newUser).pipe(delay(500));
  }

  mockEditUser$(user: User): Observable<User> {
    this.users = this.users.map(x => (x.id === user.id ? user : x));
    return of(user).pipe(delay(500));
  }

  mockDeleteUserById$(id: string): Observable<User> {
    const i = this.users.map(x => x.id).indexOf(id);
    const user = this.users[i];
    this.users = this.users.filter(x => !(x.id === id));
    return of(user).pipe(delay(500));
  }
}
