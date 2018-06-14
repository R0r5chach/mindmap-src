import { Injectable } from '@angular/core';
import { Http, Jsonp, Headers } from '@angular/http';
// import { Observable } from 'rxjs';
// import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    //POST email, password
    login(user) {
        let url = "http://10.222.174.42:8080/token";
        let body = JSON.stringify(user);

        this.http.post(url, body, { headers: this.headers }).subscribe(function (data) {
            console.dir(data);
            localStorage.setItem('currentUsr', JSON.stringify(data));
        }, function (err) {
            console.dir(err);
        });
    }

    //DELETE delete a token
    logout() {
        let url = "/token";
        localStorage.removeItem('currentUser');
    }
}