import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  isCollapsed = false;

  username: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['./auth']);
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('nickname');
  }
}
