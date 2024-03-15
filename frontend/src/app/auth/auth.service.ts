import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USERS_LOGIN_URL } from '../shared/constans/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSebject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;
  constructor(private  http: HttpClient,
    private toastrService: ToastrService) {
    this.userObservable = this.userSebject.asObservable();
  }

  login(userData: IUserLogin): Observable<User>{
    return this.http.post<User>(USERS_LOGIN_URL, userData).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSebject.next(user);
          this.toastrService.success(
            `Welcome to YumYum ${user.name}`,
            'Login Successful!'
          )
        }, error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );
  }

  logout(){
    this.userSebject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User{
    const userJson = localStorage.getItem(USER_KEY);
    if(!userJson){
      return new User();
    }

    return JSON.parse(userJson) as User;
  }
}
