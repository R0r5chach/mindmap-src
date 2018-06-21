import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: any = {};
  passwordAgain: string;

  constructor(
    private router: Router,
    private userservice: UserService) {
  }

  ngOnInit() {
    this.user = {
      email: '',
      name: '',
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

  register() {
    console.log("begin to register user: ");
    console.log(this.user);

    //与服务器端通信，确认是否注册成功
    let _that = this;
    this.userservice.register(this.user).subscribe(function (suc) {
      let sucResp = JSON.parse(suc['_body']);
      console.log("register resp:");
      console.log(sucResp);

      _that.router.navigate(['login']);
    }, function (err) {
      let errResp = JSON.parse(err['_body']);
      console.log(errResp);
      alert(errResp.message);
    });
  }

}
