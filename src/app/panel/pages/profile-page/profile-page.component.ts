import { Component, OnInit } from '@angular/core';
import {ValidatorsService} from '../../../services/validators-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {UserServiceProvider} from '../../../services/user-service.provider';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  changePassForm: FormGroup;
  error: string;
  loading = false;
  submitted = false;
  hidepwd = true;
  user: User;

  constructor(private formBuilder: FormBuilder,
              public snackBar: MatSnackBar,
              private userService: UserServiceProvider,
              private router: Router) {
    this.userService.getLoggedUser().subscribe(user => {
      this.user = user;
    });
  }

  get f() { return this.changePassForm.controls; }

  ngOnInit() {
    this.changePassForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      password_confirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
    }, {
      validator: ValidatorsService.MatchPassword // your validation method
    });
  }

  changePassword() {
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.changePassForm.invalid) {
      return;
    }

    this.userService.changePass(this.f.password.value).subscribe(data => {
      this.snackBar.open('Password Change Successful', '', {duration: 5000, });
      this.router.navigate(['/panel']);
      this.loading = false;
    }, error => {
      if (error.status === 400) {
        this.error = 'Invalid username/password';
      }  else { this.error = error.statusText; }
      this.loading = false;
    });
    return;
  }

  getPwdErrorMessage() {
    return this.changePassForm.get('password').hasError('required') ? 'Password required' :
      this.changePassForm.get('password').hasError('minlength') ? 'Password minimum length is 6' :
        this.changePassForm.get('password').hasError('maxlength') ? 'Password maximum length is 16' :
          '';
  }

  getPwdConfirmErrorMessage() {
    return this.changePassForm.get('password_confirm').hasError('required') ? 'Password required' :
      this.changePassForm.get('password_confirm').hasError('minlength') ? 'Password minimum length is 6' :
        this.changePassForm.get('password_confirm').hasError('maxlength') ? 'Password maximum length is 16' :
          '';
  }

}
