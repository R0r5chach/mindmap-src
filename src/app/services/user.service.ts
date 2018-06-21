import { Injectable } from '@angular/core';
import { MyHttpService } from './MyHttp.service';

@Injectable()
export class UserService {

    constructor(private myHttp: MyHttpService) { }

    //POST email, name, password, type
    register(user) {
        let url = '/users';
        let body = JSON.stringify(user);
        return this.myHttp.post(url, body);
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