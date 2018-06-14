import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {
  userType;

  questions = [
    {
      "id": 1,
      "type": "MULTIPLE_CHOICE",
      "description": "你最喜欢哪门课？",
      "choices": [
        {
          "key": "A",
          "value": "高级Web"
        },
        {
          "key": "B",
          "value": "图形学"
        }, {
          "key": "C",
          "value": "操作系统"
        }, {
          "key": "D",
          "value": "软件工程"
        }],
      "answer": "A",
      "submit": "true"
    },
    {
      "id": 2,
      "type": "MULTIPLE_CHOICE",
      "description": "哪门课考试最近？",
      "choices": [
        {
          "key": "A",
          "value": "高级Web"
        }, {
          "key": "B",
          "value": "图形学"
        }, {
          "key": "C",
          "value": "操作系统"
        }, {
          "key": "D",
          "value": "软件工程"
        }],
      "answer": "",
      "submit": "false"
    },
    {
      "id": 3,
      "type": "SHORT_ANSWER",
      "description": "今天晚饭吃什么？",
      "answer": "",
      "submit": "false"
    },
    {
      "id": 33,
      "type": "SHORT_ANSWER",
      "description": "今天晚饭吃什么？",
      "answer": "随便啊",
      "submit": "true"
    }
  ];

  constructor(private modalService: BsModalService, private storage: StorageService) { }

  ngOnInit() {
    this.userType = this.storage.getItem("userType");
  }

  setAnswer(q, ans) {
    q.answer = ans;
  }

  answerQuestion(q) {
    if (q.answer == "") {
      alert("答案不能为空！"); { }
    } else {

      let body = {
        "qid": q.qid,
        "answer":q.answer
      }
      console.log(body);

      //http
    }
    q.submit = "true";
  }
}