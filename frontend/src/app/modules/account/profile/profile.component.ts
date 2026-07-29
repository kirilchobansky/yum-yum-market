import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Food, User } from 'src/app/core/models';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: false,
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private accountService = inject(AccountService);

  user!: User;
  profileDetailsGroup!: FormGroup;
  isSubmitted = false;
  returnUrl = '';
  favoriteFoods: Food[] | [] = [];
  userId = this.authService.currentUser.id;

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.profileDetailsGroup = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      address: [this.user.address, [Validators.required]],
    });

    this.getFavoriteFoods();
  }

  get fc() {
    return this.profileDetailsGroup.controls;
  }

  getFavoriteFoods() {
    this.accountService.getfavoriteFoods(this.userId).subscribe((foods) => {
      this.favoriteFoods = foods;
    });
  }

  submit() {
    this.isSubmitted = true;
    if (!this.profileDetailsGroup.valid) {
      return;
    }

    const userData = {
      name: this.fc.name.value?.trim(),
      email: this.fc.email.value?.trim(),
      address: this.fc.address.value?.trim(),
    };

    const hasChanges =
      this.user.name !== userData.name ||
      this.user.email !== userData.email ||
      this.user.address !== userData.address;

    if (!hasChanges) {
      this.accountService.showNoChangesMessage();
      return;
    }

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    this.accountService
      .updateUserDetails({ ...userData, userId: this.userId })
      .subscribe({
        next: () => {
          this.user = { ...this.user, ...userData };
          this.authService.setUserToLocalStorage(this.user);
        },
        error: (errorResponse) => {
          this.accountService.showErrorMessage(
            errorResponse?.error || 'Could not update profile',
          );
        },
      });
  }
}
