import { Injectable } from '@angular/core';
import { Http, Jsonp, Headers } from '@angular/http';
// import { Observable } from 'rxjs';
// import 'rxjs/Rx';

@Injectable()
export class UserService {
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    //POST email, name, password, type
    register(user) {
        let url = 'http://10.222.174.42:8080/users';
        let body = JSON.stringify(user);

        console.log(user);
        this.http.post(url, body, { headers: this.headers }).subscribe(function (data) {
            console.dir(data);
            localStorage.setItem('currentUsr', JSON.stringify(data));
        }, function (err) {
            console.dir(err);
        });
    }

    //DELETE 
    delete() {
        let url = '/account';
    }

    //PUT email, name, password, newPassword
    update(user) {
        let url = '/account';
    }

    //GET
    getPrivate() {
        let url = '/account';
    }

    //GET
    getPublic() {
        let url = '/users/{uid}';
    }
}