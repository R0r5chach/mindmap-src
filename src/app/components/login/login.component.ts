import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import { StorageService } from '../../services/storage.service';
import { Http, Jsonp, Headers } from '@angular/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  user: any = {};

  constructor(
    private http: Http,
    private router: Router,
    private authentication: AuthenticationService,
    private storage: StorageService) {
  }

  ngOnInit() {
    this.user = {
      email: '',
      password: '',
      type: 'TEACHER'
    };
  }

  setTypeStu() {
    this.user.type = 'STUDENT';
  }
  setTypeTec() {
    this.user.type = 'TEACHER';
  }

  login() {
    console.log("begin to login: ");
    console.log(this.user);

    this.storage.setItem("curUser", this.user);

    let _that = this;

    let url = "http://10.222.174.42:8080/token";
    let body = JSON.stringify(this.user);

    this.http.post(url, body, { headers: this.headers }).subscribe(function (data) {
      console.dir(data);
      console.log("get token: ");
      console.log(JSON.parse(data['_body']));

      console.log("set token to localStorage: ");
      let token = JSON.parse(data['_body'])["token"];
      _that.storage.setItem("token", token);

      _that.router.navigate(['courselist']);

    }, function (err) {
      console.dir(err);
    });



  }
}
