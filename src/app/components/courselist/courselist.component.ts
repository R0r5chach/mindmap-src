import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StorageService } from '../../services/storage.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {
  modalRef: BsModalRef;
  userType;
  myCourses = [{
    "name": "高级web",
    "code": "01",
    "teacher_id": "2",
    "student_num": 35
  }, {
    "name": "机器学习",
    "code": "02",
    "teacher_id": "3",
    "student_num": 13
  }, {
    "name": "操作系统",
    "code": "03",
    "teacher_id ": "17",
    "student_num": 23
  }];

  choosebleCourses = [{
    "name": "高级web",
    "code": "01",
    "teacher_id": "2",
    "student_num": 23
  }, {
    "name": "机器学习",
    "code": "02",
    "teacher_id": "3",
    "student_num": 23
  }, {
    "name": "操作系统",
    "code": "03",
    "teacher_id ": "17",
    "student_num": 23
  }];
  newCourse = {
    "name": "",
    "code": "",
    "teacher_id": "",
    "student_num": 0
  };

  constructor(private modalService: BsModalService,
    private storage: StorageService,
    private course: CourseService
  ) { }

  ngOnInit() {
    this.userType = this.storage.getItem("userType");
    // this.myCourses = this.course.listCoursesOfUser();
  }

  openAddCourseWindow(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openChooseCourseWindow(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  chooseCourse(i) {
    this.myCourses.push(this.choosebleCourses[i]);
    this.choosebleCourses.splice(i, 1);//删除
  }

  cancelAdd() {
    this.modalRef.hide();
  }

  confirmAdd() {
    this.modalRef.hide();
    //发送请求
    this.myCourses.push(this.newCourse);
    this.course.create(this.newCourse);
    console.log(this.newCourse);
  }
}