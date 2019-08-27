import {Injectable} from '@angular/core';

@Injectable()
export class ValidService {

  validEmail(input: string): string {

    if (!input) {
      return 'Email is required!';
    }

    const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

    if (!reg.test(input)) {
      return 'Email should be the real one!';
    }

    return '';
  }

  validPassword(input: string): string {
    if (!input) {
      return 'Password is required!';
    }

    if (input.length < 4 || input.length > 26) {
      return 'Password should contain from 4 to 26 characters';
    }

    return '';
  }
}
