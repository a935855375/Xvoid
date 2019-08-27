import {Component, OnInit} from '@angular/core';
import {ValidService} from '../../service/valid-service';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {ApiService} from '../../service/api-service';
import {User} from '../../entity/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../common.scss']
})
export class RegisterComponent implements OnInit {

  nickname: string;

  email: string;

  checked = false;

  emailError = '';

  password;

  rePassword;

  passwordError = '';

  rePasswordError = '';

  isRegisterEnabled = false;

  isSpinning = false;

  constructor(private validService: ValidService,
              private apiService: ApiService,
              private router: Router,
              private modalService: NzModalService) {

  }

  ngOnInit() {
  }

  register() {
    const user = new User();
    user.email = this.email;
    user.nickname = this.nickname;
    user.password = this.password;

    this.isSpinning = true;

    this.apiService.register(user).then(x => {
      this.isSpinning = false;
      this.modalService.success({
        nzTitle: 'Register successfully',
        nzContent: 'Congratulations!',
        nzOnOk: instance => {
          this.router.navigate(['/auth/login'])
        }
      });
    }).catch(err => {
      this.isSpinning = false;
      if (err.error && err.error.msg) {
        this.modalService.error({
          nzTitle: 'Register failed',
          nzContent: err.error.msg
        });
      } else {
        this.modalService.error({
          nzTitle: 'Register failed',
          nzContent: 'Network error'
        });
      }
    });
  }

  formChange(type: string, value) {
    switch (type) {
      case 'nickname':
        this.nickname = value;
        break;
      case 'email':
        this.email = value;
        this.emailError = this.validService.validEmail(this.email);
        break;
      case 'password':
        this.password = value;
        this.passwordError = this.validService.validPassword(this.password);
        break;
      case 'rePassword':
        this.rePassword = value;
        this.rePasswordError = this.password == this.rePassword ? '' : 'The password is inconsistent with the confirmation password.';
        break;
    }

    this.isRegisterEnabled = this.password && this.rePassword && this.email
      && (this.passwordError == '' && this.emailError == '' && this.rePasswordError == '');
  }
}
