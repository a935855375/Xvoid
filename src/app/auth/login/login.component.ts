import {Component, OnInit} from '@angular/core';
import {ValidService} from '../../service/valid-service';
import {AuthService} from '../../service/auth-service';
import {NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../common.scss']
})
export class LoginComponent implements OnInit {

  email: string;

  password: string;

  checked = false;

  emailError = '';

  passwordError = '';

  isLoginEnabled = this.password && this.email && (this.passwordError == '' && this.emailError == '');

  isSpinning = false;

  constructor(private validService: ValidService,
              private authService: AuthService,
              private router: Router,
              private modalService: NzModalService) {

  }

  ngOnInit() {
  }

  login() {
    this.isSpinning = true;
    this.authService.login(this.email, this.password).then(_ => {
      this.isSpinning = false;
      this.router.navigate(['/pages']);
    }).catch(err => {
      this.isSpinning = false;
      if (err.error && err.error.msg) {
        this.modalService.error({
          nzTitle: 'Login failed',
          nzContent: err.error.msg
        });
      } else {
        this.modalService.error({
          nzTitle: 'Login failed',
          nzContent: 'Network error'
        });
      }
    });
  }

  formChange(type: string, value) {
    switch (type) {
      case 'email':
        this.email = value;
        this.emailError = this.validService.validEmail(this.email);
        break;
      case 'password':
        this.password = value;
        this.passwordError = this.validService.validPassword(this.password);
        break;
    }

    this.isLoginEnabled = this.password && this.email && (this.passwordError == '' && this.emailError == '');
  }
}
