import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  emailControl!: FormControl;
  passwordControl!: FormControl;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.emailControl = this.loginForm.get('email') as FormControl;
    this.passwordControl = this.loginForm.get('password') as FormControl;
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
      this.isSubmitted = true;
      if(!this.loginForm.valid) {
          return;
      }

      const userData = {
        email: this.fc.email.value, 
        password: this.fc.password.value
      }
      
      this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
      this.authService.login(userData).subscribe(() => {
        if (this.returnUrl) {
          this.router.navigate([...this.returnUrl]);
        } else {
          this.router.navigate(['/foods/dashboard']);
          window.location.reload();
        }
    });
  }
  
}
