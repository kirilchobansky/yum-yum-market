import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Food, User } from 'src/app/core/models';
import { AccountService } from '../services/account.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: false
})
export class ProfileComponent implements OnInit{

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
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
      address: [this.user.address, [Validators.required]]
    });

    this.getFavoriteFoods();
  }

  get fc(){
    return this.profileDetailsGroup.controls;
  };

  getFavoriteFoods(){
    this.accountService.getfavoriteFoods(this.userId).subscribe((foods) => {
      this.favoriteFoods = foods;
    })
  }

  submit(){
    this.isSubmitted = true;
    if(!this.profileDetailsGroup.valid) {
        return;
    }

    const userData = {
      name: this.fc.name.value,
      email: this.fc.email.value,
      address: this.fc.address.value,
    }

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    this.accountService.updateUserDetails({...userData, userId: this.userId}).subscribe(() => {
      this.router.navigate([...this.returnUrl]);
    })
    console.log(this.returnUrl);
    
  }

}
