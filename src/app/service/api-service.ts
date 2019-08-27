import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../entity/user';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {

  }

  register(form: User) {
    const url = environment.apiUrl;
    return this.http.post(url + 'signUp', form).toPromise();
  }
}
