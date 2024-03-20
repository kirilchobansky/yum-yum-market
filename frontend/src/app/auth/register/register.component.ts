import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { passwordMatchValidator } from 'src/app/core/validators/passwordMatchValidator';
import { IUserRegister } from 'src/app/core/interfaces/IUserRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rePass: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(4)]],
    },{
      validators: passwordMatchValidator('password', 'rePass')
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true;

    if(!this.registerForm.valid) {
          return;
    }

    const fv = this.registerForm.value;
    const user: IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      rePass: fv.rePass,
      address: fv.address
    };
    
    this.authService.register(user).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

  
}
