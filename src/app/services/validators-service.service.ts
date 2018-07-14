import { Injectable } from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('password_confirm').value; // to get value in input tag
    if (password !== confirmPassword) {
      // console.log('false');
      AC.get('password_confirm').setErrors( {MatchPassword: true} );
    } else {
      // console.log('true');
      return null;
    }
  }
}
