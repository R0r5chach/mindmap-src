import { Component, OnInit } from '@angular/core';
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

  constructor(private http: Http) { }

  ngOnInit() {
  }
}
