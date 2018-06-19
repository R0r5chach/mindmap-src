import { Component, OnInit, ViewChild, TemplateRef, ElementRef, AfterViewInit } from '@angular/core';
import { MindmapComponent } from '../mindmap/mindmap.component';
import { HomeworkComponent } from '../homework/homework.component';
import { LectureComponent } from '../lecture/lecture.component';
import { FileUploader } from 'ng2-file-upload';
import { FileItem } from 'ng2-file-upload';
import { ActivatedRoute, Params } from '@angular/router';
import { Http, Jsonp, Headers } from '@angular/http';


import { StorageService } from '../../services/storage.service';
import * as $ from 'jquery';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MyHttpService } from '../../services/MyHttp.service';
import { resource } from 'selenium-webdriver/http';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {
    public graphs = [
        {
            "name": "思维导图一",
            "id": 1,
            "description": "思维导图01"
        }, {
            "name": "思维导图二",
            "id": 2,
            "description": "思维导图02"
        }, {
            "name": "思维导图三",
            "id": 3,
            "description": "思维导图03"
        }, {
            "name": "思维导图四",
            "id": 4,
            "description": "思维导图04"
        }
    ];
    newGraph = {
        name: "",
        description: "",
        jsmind: ""
    };
    homeworkContent = {
        newMultichoice: {
            "description": "",
            "type": "MULTIPLE_CHOICE",
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

        newShortanswer: {
            "type": "SHORT_ANSWER",
            "description": ""
        }
    };

    lectureContent = {
        uploader: new FileUploader({
            url: "http://10.222.174.42:8080/nodes/root40c570ed2c787d8a/lecture",
            authToken: this.storage.getItem('token'),
            method: "POST",
            itemAlias: "lecture",
            autoUpload: false
        })
    };

    recourcesContent = {
        uploader: new FileUploader({
            // url: "http://10.222.174.42:8080/nodes/root40c570ed2c787d8a/resources/files",
            authToken: this.storage.getItem('token'),
            method: "POST",
            itemAlias: "file",
            autoUpload: false
        }),
        URL: {
            name: "",
            location: ""
        }
    }

    curUser = this.storage.getItem("curUser");
    courseId;
    curNodeId = null;
    sidebarType = 0;
    description = "请输入描述";
    index = "hello";

    @ViewChild(MindmapComponent) child: MindmapComponent;
    @ViewChild(HomeworkComponent) homework: HomeworkComponent;
    @ViewChild(LectureComponent) lecture: LectureComponent;


    ngAfterViewInit() {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
    }
    modalRef: BsModalRef;

    constructor(
        private http: Http,
        private myHttp: MyHttpService,
        private routerIonfo: ActivatedRoute,
        private modalService: BsModalService,
        private storage: StorageService) {
    }

    ngOnInit() {
        this.courseId = this.routerIonfo.snapshot.queryParams["cid"];
        this.getGraphs();

        this.startJquery();
        this.recourcesContent.uploader.onSuccessItem = this.successItem.bind(this);
        this.recourcesContent.uploader.onAfterAddingFile = this.afterAddFile.bind(this);
        this.recourcesContent.uploader.onBuildItemForm = this.buildItemForm.bind(this);
        // this.uploader.onSuccessItem = this.successItem.bind(this);
        // this.uploader.onAfterAddingFile = this.afterAddFile;
        // this.uploader.onBuildItemForm = this.buildItemForm;
        // this.child.getData(this.graphs[0].id);
    }


    setSidebar(type) {
        this.sidebarType = type;
        this.startJquery();
        switch (this.sidebarType) {
            case 0:
                break;
            case 1:
            this.homework.getQuestions();
                break;
            case 2:
            this.lecture.getLectures();
                break;
            case 3:
            this.lecture.getLectures();
                break;
            default:
                break;
        }
    }

    prtScn() {
        this.child.prtScn();
    }

    changeGraph(item) {
        // console.log(item.id);
        this.child.getData(item.id);
    }


    changeStatus(event) {
        this.curNodeId = event;
    }

    save() {
        this.child.save();
    }

    startJquery() {
        $(function () {
            // nav收缩展开
            $('.nav-item>a').on('click', function () {
                if (!$('.my-nav').hasClass('nav-mini')) {
                    if ($(this).next().css('display') == "none") {
                        //展开未展开
                        $('.nav-item').children('ul').slideUp(300);
                        $(this).next('ul').slideDown(300);
                        $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');
                    } else {
                        //收缩已展开
                        $(this).next('ul').slideUp(300);
                        $('.nav-item.nav-show').removeClass('nav-show');
                    }
                }
            });
            //nav-mini切换
            $('#mini').on('click', function () {
                if (!$('.my-nav').hasClass('nav-mini')) {
                    $('.nav-item.nav-show').removeClass('nav-show');
                    $('.nav-item').children('ul').removeAttr('style');
                    $('.my-nav').addClass('nav-mini');
                } else {
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

    getGraphs() {
        // console.log("get all graphs:");

        let url = "/courses/" + this.courseId + "/graphs";

        let _that = this;
        this.myHttp.get(url).subscribe(function (data) {
            // console.log("all graph meta_data");
            // console.log(data['_body']);
            _that.graphs = JSON.parse(data['_body']);
        }, function (err) {
            console.dir(err);
        });
    }

    addNewGraph() {
        // console.log("begin to add graph:");
        // console.log(this.newGraph);

        let url = "/courses/" + this.courseId + "/graphs";
        let body = JSON.stringify(this.newGraph);

        let _that = this;
        this.myHttp.post(url, body).subscribe(function (data) {
            // console.log("new graph meta");
            // console.log(data['_body']);
            let jsonData = JSON.parse(data['_body']);
            _that.graphs.push(jsonData);
            _that.child.getData(jsonData.id);
            _that.modalRef.hide();
        }, function (err) {
            console.dir(err);
        });
    }



    //作业部分方法--------------------------------------------------------------
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    addMultichoice() {
        // console.log("begin to add multichoice questions:");
        // console.log(this.homeworkContent.newMultichoice);

        let url = "/nodes/" + this.curNodeId + "/questions";
        let body = JSON.stringify(this.homeworkContent.newMultichoice);

        let _that = this;
        this.myHttp.post(url, body).subscribe(function (data) {
            console.dir(data);
            // console.log(data['_body']);

            //刷新子模块问题列表
            _that.modalRef.hide();
        }, function (err) {
            console.dir(err);
        });

        this.clearQuestion();
    }

    addShortanswer() {
        // console.log("begin to add shortanswer questions:");
        // console.log(this.homeworkContent.newShortanswer);

        let url = "/nodes/" + this.curNodeId + "/questions";
        let body = JSON.stringify(this.homeworkContent.newShortanswer);

        let _that = this;
        this.myHttp.post(url, body).subscribe(function (data) {
            console.dir(data);
            // console.log(data['_body']);

            //刷新子模块问题列表
            this.modalRef.hide();
        }, function (err) {
            console.dir(err);
        });

        this.clearQuestion();
    }

    cancelAddQuestion() {
        this.modalRef.hide();
        this.clearQuestion();
    }

    setMultiAnswer(choice) {
        // console.log(choice);
        this.homeworkContent.newMultichoice.answer = choice;
    }

    setAnswer(ans) {
        // console.log(ans);
    }

    clearQuestion() {
        this.homeworkContent = {
            newMultichoice: {
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

            newShortanswer: {
                "type": "SHORT_ANSWER",
                "description": ""
            }
        }
    }

    //上传所有文件
    fileAllUp(upload): any {
        console.log("file all up");
        upload.uploadAll();
    }

    //取消所有文件
    fileAllCancel(): any {
        console.log("file all cancel");
        this.recourcesContent.uploader.cancelAll();
    }

    //删除所有文件
    fileAllDelete(): any {
        console.log("file all delete");
        this.recourcesContent.uploader.clearQueue();
    }

    //构造上传文件表项
    buildItemForm(fileItem: FileItem, form: any): any {
        // this.curContent.uploader.options.url = "http://10.222.174.42:8080/nodes/" + this.curNodeId + "/" + this.curContent.formData.type;
        // fileItem.url = "http://10.222.174.42:8080/nodes/" + this.curNodeId + "/" + this.curContent.formData.type;
        if (this.sidebarType == 2) {
            fileItem.url = "http://10.222.174.42:8080/nodes/" + this.curNodeId + "/lecture";
        } else {
            fileItem.url = "http://10.222.174.42:8080/nodes/" + this.curNodeId + "/resources/files";
        }

        console.log(this.description);
        form.append("description", this.description);
    }

    //增加文件回执
    afterAddFile(fileItem: FileItem): any {
        fileItem.withCredentials = false;
    }

    //上传文件成功回执
    successItem(item: FileItem, response: string, status: number): any {
        // 上传文件成功 
        if (status == 200) {
            // 上传文件后获取服务器返回的数据
            let tempRes = JSON.parse(response);
        } else {
            // 上传文件后获取服务器返回的数据错误  
        }
        console.info(" for " + item.file.name + " status " + status);
    }

    //资源*----------------------------------------------------------------------------------------
    openRecourcesModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    addURL() {
        this.modalRef.hide();
        //提交新的URL资源
    }





}
