import { Component, OnInit, TemplateRef, Input, ViewChild, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StorageService } from '../../services/storage.service';
import { MyHttpService } from '../../services/MyHttp.service';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {
  @Input() curNodeId;

  @ViewChild('test', { read: ElementRef }) private test: ElementRef;

  curUser;

  questions = [
    // {
    //   "id": 1,
    //   "type": "MULTIPLE_CHOICE",
    //   "description": "你最喜欢哪门课？",
    //   "choices": [
    //     {
    //       "key": "A",
    //       "value": "高级Web"
    //     },
    //     {
    //       "key": "B",
    //       "value": "图形学"
    //     }, {
    //       "key": "C",
    //       "value": "操作系统"
    //     }, {
    //       "key": "D",
    //       "value": "软件工程"
    //     }],
    //   "answer": "A",
    //   "submit": "true"
    // },
    // {
    //   "id": 2,
    //   "type": "MULTIPLE_CHOICE",
    //   "description": "哪门课考试最近？",
    //   "choices": [
    //     {
    //       "key": "A",
    //       "value": "高级Web"
    //     }, {
    //       "key": "B",
    //       "value": "图形学"
    //     }, {
    //       "key": "C",
    //       "value": "操作系统"
    //     }, {
    //       "key": "D",
    //       "value": "软件工程"
    //     }],
    //   "answer": "",
    //   "submit": "false"
    // },
    // {
    //   "id": 3,
    //   "type": "SHORT_ANSWER",
    //   "description": "今天晚饭吃什么？",
    //   "answer": "",
    //   "submit": "false"
    // },
    // {
    //   "id": 33,
    //   "type": "SHORT_ANSWER",
    //   "description": "今天晚饭吃什么？",
    //   "answer": "随便啊",
    //   "submit": "true"
    // }
  ];

  questionsWithStatus=[];

  constructor(
    private myHttp: MyHttpService,
    private modalService: BsModalService,
    private storage: StorageService) {
  }

  ngOnInit() {
    this.curUser = this.storage.getItem("curUser");
    this.initQWithStatus();
  }

  setAnswer(q, ans) {
    q.answer = ans;
  }

  answerQuestion(q) {
    if (q.answer == "") {
      alert("答案不能为空！"); { }
    } else {
      let url = "/questions/" + q.id + "/answers";
      let body = JSON.stringify({ "answer": q.answer });
      console.log("begin to answer question:");
      console.log(body);
      //http
      let _that = this;
      this.myHttp.post(url, body).subscribe(function (data) {
        _that.getQuestions();
        _that.initQWithStatus();
      }, function (err) {
        console.dir(err);
      });

    }
    //q.answered = "true";
  }

  //从后台获取题目数据
  getQuestions() {
    console.log("get questions");

    let url = "/nodes/" + this.curNodeId + "/questions";
    
    let _that = this;
    this.myHttp.get(url).subscribe(function (data) {
      console.dir(data);
      console.log(data['_body']);
      _that.questions = JSON.parse(data['_body']);
    }, function (err) {
      console.dir(err);
    });
  }

  initQWithStatus(){
    this.questionsWithStatus = this.questions;
    for(let q of this.questionsWithStatus){
      if(q.answer == ""){
        q.append("answered", true);
      }else{
        q.append("answered", false);
      }
    }
  }

}