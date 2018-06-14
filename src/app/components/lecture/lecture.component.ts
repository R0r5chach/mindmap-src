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

  lectures = [
    {
      "lid": 78,
      "title": "第一课",
      "description": "这是高级web第一次课的课件"
    },
    {
      "lid": 8,
      "title": "第二课",
      "description": "这是高级web第二次课的课件"
    },
    {
      "lid": 908,
      "title": "第三课",
      "description": "这是高级web第三次课的课件"
    }
  ];


  constructor(private http: Http) { }

  ngOnInit() {
  }
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);

      console.dir(file.name);
      console.dir(file.size);

      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      this.http.post('http://localhost:8080/', formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
          data => console.log('success'),
          error => console.log(error)
        )
    }
  }

  downloadLecture(lectureId) {
    console.log("download lecture" + lectureId);
    //http
  }

}
