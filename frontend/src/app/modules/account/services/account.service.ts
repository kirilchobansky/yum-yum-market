import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {
  USERS_FAVORITE_FOODS_URL,
  USERS_UPDATE_URL,
} from 'src/app/core/constants/urls';
import { Food, User } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private http: HttpClient,
    @Inject(AuthService) private authService: AuthService,
    @Inject(ToastrService) private toastrService: ToastrService,
  ) {}

  updateUserDetails(userData: object): Observable<User> {
    return this.http.post<User>(USERS_UPDATE_URL, userData).pipe(
      tap({
        next: () => {
          this.toastrService.success(
            'Profile updated successfully. Please sign in again to use the new details.',
            'Profile Updated',
          );
        },
      }),
    );
  }

  showNoChangesMessage(): void {
    this.toastrService.info(
      'No changes were detected. Nothing was updated.',
      'No Changes',
    );
  }

  showErrorMessage(message: string): void {
    this.toastrService.error(message, 'Update Failed');
  }

  getfavoriteFoods(userId: string): Observable<Food[]> {
    return this.http.get<Food[]>(USERS_FAVORITE_FOODS_URL + '/' + userId);
  }
}
