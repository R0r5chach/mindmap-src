import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StorageService } from '../../services/storage.service';
import { CourseService } from '../../services/course.service';
import { Http, Jsonp, Headers } from '@angular/http';
import { element } from 'protractor';


@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {
  modalRef: BsModalRef;
  curUser;

  myCourses = [];

  allCourses = [{
    "name": "高级web",
    "id": 4,
    "code": "01",
    "teacher_name": "xiaoming",
    "teacher_id": "2",
    "student_num": 23
  }, {
    "name": "机器学习",
    "id": 5,
    "code": "02",
    "teacher_name": "xiaogang",
    "teacher_id": "3",
    "student_num": 23
  }, {
    "name": "操作系统",
    "id": 6,
    "code": "03",
    "teacher_name": "a wei",
    "teacher_id ": "17",
    "student_num": 23
  }];

  newCourse = {
    "name": "",
    "code": "",
  };

  choosenCourse = {
    "id": -1,
    "code": ""
  }

  constructor(
    private http: Http,
    private modalService: BsModalService,
    private storage: StorageService,
    private course: CourseService
  ) {
  }

  ngOnInit() {
    this.curUser = this.storage.getItem("curUser");
    console.log("current user: ");
    console.log(this.curUser);
    this.getCourses();
    console.log("onInit");
    console.log(this.myCourses);
  }

  openAddCourseWindow(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openChooseCourseWindow(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openInputCourseCodeWindow(template: TemplateRef<any>, id) {
    this.modalRef = this.modalService.show(template);
    this.setChoosenCourseId(id);
  }

  setChoosenCourseId(id) {
    this.choosenCourse.id = id;
  }

  setChoosenCourseCode(code) {
    this.choosenCourse.code = code;
  }

  //发送选课请求，更新myCourses
  chooseCourse() {
    this.modalRef.hide();
    console.log("choose course:");
    console.log(this.choosenCourse);
    this.choosenCourse = {
      "id": -1,
      "code": ""
    };
  }

  cancelAdd() {
    this.modalRef.hide();
  }

  //发送添加请求，更新myCourses
  confirmAdd() {
    //发送请求
    console.log("begin to add new course:");
    console.log(this.newCourse);

    let url = "http://192.168.1.102:8080/courses";
    let body = JSON.stringify(this.newCourse);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.storage.getItem('token')
    });

    let _that = this;
    this.http.post(url, body, { headers: headers }).subscribe(function (data) {
      console.dir(data);
      console.log(data['_body']);
      _that.getCourses();
      _that.modalRef.hide();
    }, function (err) {
      console.dir(err);
    });

    this.newCourse = {
      "name": "",
      "code": "",
    };
  }

  getCourses() {
    console.log("get courses:");

    let url = "http://192.168.1.102:8080/account/courses";
    let body = JSON.stringify(this.newCourse);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.storage.getItem('token')
    });

    let _that = this;
    this.http.get(url, { headers: headers }).subscribe(function (data) {
      console.dir(data);
      console.log("get courses");
      console.log(data['_body']);
      _that.myCourses = JSON.parse(data['_body']);
      console.log(_that.myCourses);
    }, function (err) {
      console.dir(err);
    });
  }

}