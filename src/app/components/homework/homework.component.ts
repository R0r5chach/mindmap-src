import { Component, OnInit, TemplateRef, Input, ViewChild, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StorageService } from '../../services/storage.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})

export class HomeworkComponent implements OnInit {
  @Input() curNodeId;
  nid;

  @ViewChild('test', { read: ElementRef }) private test: ElementRef;

  curUser;

  questions = [];

  constructor(
    private questionService: QuestionService,
    private storage: StorageService) {
  }

  ngOnInit() {
    this.curUser = this.storage.getItem("curUser");
    this.initQWithStatus();
  }

  setAnswer(q, ans) {
    q.answer = ans;
  }

  //获取题目
  getQuestions(nid) {
    this.nid = nid;
    console.log("get questions");

    let _that = this;
    this.questionService.listQuestionsOfNode(this.nid).subscribe(function (suc) {
      let sucResp = JSON.parse(suc['_body']);
      console.log("get questions resp:");
      console.log(sucResp);
      _that.questions = sucResp;
      _that.initQWithStatus();
    }, function (err) {
      let errResp = JSON.parse(err['_body']);
      console.dir(errResp);
      alert(errResp.message);
    });
  }

  answerQuestion(q) {
    if (q.answer == "") {
      alert("答案不能为空！"); { }
    } else {
      let answer = { "answer": q.answer };
      console.log("to answer question:");

      let _that = this;
      this.questionService.addAnswerToQuestion(q.id, answer).subscribe(function (suc) {
        // let sucResp = JSON.parse(suc['_body']);
        console.log("answer question resp");
        // console.log(sucResp);

        alert("answered");
        _that.getQuestions(_that.nid);
        _that.initQWithStatus();
      }, function (err) {
        let errResp = JSON.parse(err['_body']);
        console.dir(errResp);
        alert(errResp.message);
      });

    }
  }

  initQWithStatus() {
    console.log("init questions ");
    for (let q of this.questions) {
      if (q.answer == null) {
        q.answered = false;
      } else {
        q.answered = true;
      }
    }
  }

}