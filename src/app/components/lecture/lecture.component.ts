import { Component, OnInit, Input } from '@angular/core';
import { Http, Jsonp, Headers } from '@angular/http';
import { RequestOptions, Request, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/Rx';


@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {
  @Input() curNodeId;

  lectures = [
    {
      "lid": 78,
      "title": "第一课",
      "description": "这是高级web第一次课的课件",
      "url":"myurl"
    },
    {
      "lid": 8,
      "title": "第二课",
      "description": "这是高级web第二次课的课件",
      "url":"myurl"
    },
    {
      "lid": 908,
      "title": "第三课",
      "description": "这是高级web第三次课的课件",
      "url":"myurl"
    }
  ];


  constructor(private http: Http) { }

  ngOnInit() {
  }
  
  

  onSuc(e) {
    alert("success");
    console.log(e);
  }

  onErr(e) {
    console.log(this.curNodeId);
    alert("failer");
    console.log(e);
  }

}
