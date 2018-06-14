import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {MindmapComponent} from '../mindmap/mindmap.component';
import {HomeworkComponent} from '../homework/homework.component';

import { StorageService } from '../../services/storage.service';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';
import * as $ from 'jquery';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @ViewChild(MindmapComponent) child:MindmapComponent;
  @ViewChild(HomeworkComponent) homework:HomeworkComponent;

  modalRef: BsModalRef;
  newGraph = {id:"",name:""};

  nodeId = null;
  sidebarType = 0;
  index = "hello";

  constructor(private modalService: BsModalService,
    private storage: StorageService) { }

  public graphs = [{id:"1",name:"思维导图一"},{id:"2",name:"思维导图二"},{id:"3",name:"思维导图三"},{id:"4",name:"思维导图四"}];

  homeworkContent = {
    newMultichoice : {
        "type": "MULTIPLE_CHOICE",
        "description": "",
        "choices": [
          {
            "key": "A",
            "value": ""
          }, {
            "key": "B",
            "value": ""
          }, {
            "key": "C",
            "value": ""
          }, {
            "key": "D",
            "value": ""
          }],
        "answer": "A"
      },
    
      newShortanswer : {
        "type": "SHORT_ANSWER",
        "description": ""
      }
  }
  ngOnInit() {
    this.startJquery();
    // this.child.getData(this.graphs[0].id);
  }

  setSidebar(type) {
    this.sidebarType = type;
    this.startJquery();
  }

  prtScn() {
    this.child.prtScn();
  }

  changeGraph(item) {
      console.log(item.id);
      this.child.getData(item.id);
  }


  changeStatus(event) {
      this.nodeId = event;
  }

  save() {
      this.child.save();
  }

  startJquery() {
    $(function(){
        // nav收缩展开
        $('.nav-item>a').on('click',function(){
            if (!$('.my-nav').hasClass('nav-mini')) {
                if ($(this).next().css('display') == "none") {
                    //展开未展开
                    $('.nav-item').children('ul').slideUp(300);
                    $(this).next('ul').slideDown(300);
                    $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');
                }else{
                    //收缩已展开
                    $(this).next('ul').slideUp(300);
                    $('.nav-item.nav-show').removeClass('nav-show');
                }
            }
        });
        //nav-mini切换
        $('#mini').on('click',function(){
            if (!$('.my-nav').hasClass('nav-mini')) {
                $('.nav-item.nav-show').removeClass('nav-show');
                $('.nav-item').children('ul').removeAttr('style');
                $('.my-nav').addClass('nav-mini');
            }else{
                $('.my-nav').removeClass('nav-mini');
            }
        });
    });
  }

  openAddCourseWindow(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  cancelAdd() {
    this.modalRef.hide();
  }

  confirmAdd() {
    this.modalRef.hide();
    //发送请求，获取id
    this.newGraph.id = "newid";
    this.graphs.push({id:this.newGraph.id, name:this.newGraph.name});
    this.child.createGraph(this.newGraph.id);
    //发送请求
    console.log(this.newGraph);
  }


  //作业部分方法--------------------------------------------------------------
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addMultichoice() {
    this.modalRef.hide();
    //发送网络请求

    console.log(this.homeworkContent.newMultichoice);
    this.clearQuestion();
}


  addShortanswer() {
    this.modalRef.hide();
    //发送网络请求

    console.log(this.homeworkContent.newShortanswer);
    this.clearQuestion();
  }

  cancelAddQuestion() {
      this.modalRef.hide();
      this.clearQuestion();
  }

  setMultiAnswer(choice) {
      console.log(choice);
    this.homeworkContent.newMultichoice.answer = choice;
  }

  setAnswer(ans) {
      console.log(ans);
  }

  clearQuestion() {
      this.homeworkContent = {
        newMultichoice : {
            "type": "MULTIPLE_CHOICE",
            "description": "",
            "choices": [
              {
                "key": "A",
                "value": ""
              }, {
                "key": "B",
                "value": ""
              }, {
                "key": "C",
                "value": ""
              }, {
                "key": "D",
                "value": ""
              }],
            "answer": "A"
          },
        
          newShortanswer : {
            "type": "SHORT_ANSWER",
            "description": ""
          }
      }
  }
}
