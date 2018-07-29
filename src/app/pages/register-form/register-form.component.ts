import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth-service.service';
import {first} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {ValidatorsService} from '../../services/validators-service.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  returnUrl: string;
  loginerror: string;
  loading = false;
  submitted = false;
  hidepwd = true;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              public snackBar: MatSnackBar) { }

  get f() { return this.registerForm.controls; }

  getErrorMessage() {
    return this.registerForm.get('email').hasError('required') ? 'You must enter a value' :
      this.registerForm.get('email').hasError('email') ? 'Not a valid email' :
        '';
  }

  getPwdErrorMessage() {
    return this.registerForm.get('password').hasError('required') ? 'Password required' :
      this.registerForm.get('password').hasError('minlength') ? 'Password minimum length is 6' :
        this.registerForm.get('password').hasError('maxlength') ? 'Password maximum length is 16' :
        '';
  }

  getPwdConfirmErrorMessage() {
    return this.registerForm.get('password_confirm').hasError('required') ? 'Password required' :
      this.registerForm.get('password_confirm').hasError('minlength') ? 'Password minimum length is 6' :
        this.registerForm.get('password_confirm').hasError('maxlength') ? 'Password maximum length is 16' :
          '';
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      password_confirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
    }, {
      validator: ValidatorsService.MatchPassword // your validation method
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/panel';
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.snackBar.open('Registration Successful', '', {duration: 3000, });
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error)
          error.error.email ? this.loginerror = error.error.email : this.loginerror = error.statusText;
          this.loading = false;
        });
  }

}
