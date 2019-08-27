import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {User} from '../entity/user';

@Injectable()
export class AuthService {
  private isLogin;
  apiUrl = environment.apiUrl;
  loginSubject = new Subject<Boolean>();

  constructor(private http: HttpClient) {
    this.isLogin = localStorage.getItem('id_token') !== undefined;
  }

  getLoginSubject() {
    return this.loginSubject;
  }


  login(email: string, password: string) {
    const url = this.apiUrl + 'login';
    const user = new User();
    user.email = email;
    user.password = password;

    return this.http.post(url, user).toPromise().then(res => {
      this.setSession(res);
      return res as any;
    });
  }

  private setSession(res) {
    localStorage.setItem('uid', res.uid);
    localStorage.setItem('nickname', res.nickname);
    localStorage.setItem('id_token', res.token);
    localStorage.setItem('expires_at', res.timeOut);
    this.isLogin = true;
    this.loginSubject.next(true);
  }

  logout() {
    this.isLogin = false;
    localStorage.removeItem('uid');
    localStorage.removeItem('nickname');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.loginSubject.next(false);
  }

  public isLoggedIn() {
    const now = new Date();
    return this.isLogin && now.getTime() < Number(localStorage.getItem('expires_at'));
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }
}
