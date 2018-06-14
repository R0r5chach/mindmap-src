import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {};

  constructor(private router: Router,
    private authentication: AuthenticationService,
    private storage: StorageService) {
  }

  ngOnInit() {
    this.user = {
      name: '',
      password: '',
      type: 'STUDENT'
    };
  }

  setTypeStu() {
    this.user.type = 'STUDENT';
  }
  setTypeTec() {
    this.user.type = 'TEACHER';
  }

  login() {
    console.dir(this.user);
    this.router.navigate(['courselist']);
    //与服务器端通信，确认是否登录成功，若成功返回token
    this.authentication.login(this.user);

    this.storage.setItem("userType", this.user.type);
  }
}
