import { Injectable } from '@angular/core';
import { Http, Jsonp, Headers } from '@angular/http';
// import { Observable } from 'rxjs';
// import 'rxjs/Rx';

@Injectable()
export class CourseService {
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    //POST name, code, teacher_id
    create(newCourse) {
        let url = '/courses';
    }

    //DELETE
    delete() {
        let url = '/course/{cid}';
    }

    //GET 
    listCoursesOfUser() {
        let url = 'http://10.222.174.42:8080/acount/courses';
        
    }

    //GET
    getCourseData() {
        let url = '/courses/{uid}';
    }

    //PUT name, code
    update() {
        let url = '/courses/{cid}';
    }

    //GET
    listStudentsOfCourse() {
        let url = '/courses/{cid}/students';
    }

    //POST uid
    addStudentToCourse() {
        let url = '/courses/{cid}/students';
    }
}