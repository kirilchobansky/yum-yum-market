import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { USERS_FAVORITE_FOODS_URL, USERS_UPDATE_URL } from 'src/app/core/constans/urls';
import { Food, User } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    private toastrService: ToastrService) { }

  updateUserDetails(userData: object): Observable<User>{
    return this.http.post<User>(USERS_UPDATE_URL, userData).pipe(
      tap({
        next: () => {
          this.authService.logout();
          this.toastrService.success('Need to login again to apply the changes');
        }
      })
    );
  }

  getfavoriteFoods(userId: string): Observable<Food[]>{
    return this.http.get<Food[]>(USERS_FAVORITE_FOODS_URL + '/' + userId);
  }
}
