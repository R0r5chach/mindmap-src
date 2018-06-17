import { Component, OnInit, ViewChild, TemplateRef, ElementRef, AfterViewInit } from '@angular/core';
import { MindmapComponent } from '../mindmap/mindmap.component';
import { HomeworkComponent } from '../homework/homework.component';
import { FileUploader } from 'ng2-file-upload';
import { FileItem } from 'ng2-file-upload';
import { ActivatedRoute, Params } from '@angular/router';
import { Http, Jsonp, Headers } from '@angular/http';



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
    curUser = this.storage.getItem("curUser");
    courseId;


    uploader: FileUploader = new FileUploader({
        url: "http://10.222.174.42:8080" + "/lectures",
        method: "POST",
        itemAlias: "uploadedfile",
        autoUpload: false
    });

    @ViewChild(MindmapComponent) child: MindmapComponent;
    @ViewChild(HomeworkComponent) homework: HomeworkComponent;
    @ViewChild("firstdiv", { read: ElementRef }) private fileUploadhe: ElementRef;


    ngAfterViewInit() {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.

    }
    modalRef: BsModalRef;
    newGraph = {
        name: "",
        description: "",
        jsmind: ""
    };

    curNodeId = null;
    sidebarType = 0;
    index = "hello";

    constructor(
        private http: Http,
        private routerIonfo: ActivatedRoute,
        private modalService: BsModalService,
        private storage: StorageService) {
    }

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
        description: "",
        data: ""
    };

    recourcesContent = {
        uploader: new FileUploader({
            url: "http://10.222.174.42:8080/nodes/" + "root40c570ed2c787d8a" + "/resources",
            method: "POST",
            headers:[],
            itemAlias: "uploadedfile",
            autoUpload: false
        }),
        URL: {
            name: "",
            location: ""
        }
    }

    ngOnInit() {
        this.courseId = this.routerIonfo.snapshot.queryParams["cid"];
        console.log("get course id");
        console.log(this.courseId);

        this.getGraphs();

        this.startJquery();
        this.uploader.onSuccessItem = this.successItem.bind(this);
        this.uploader.onAfterAddingFile = this.afterAddFile;
        this.uploader.onBuildItemForm = this.buildItemForm;
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

    confirmAdd() {
        this.modalRef.hide();
        //发送请求，获取id
        // this.newGraph.id = "newid";
        // this.graphs.push({ id: this.newGraph.id, name: this.newGraph.name });
        // this.child.createGraph(this.newGraph.id);
        //发送请求
        console.log(this.newGraph);
    }

    getGraphs() {
        console.log("get all graphs:");

        let url = "http://10.222.174.42:8080/courses/" + this.courseId + "/graphs";

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.storage.getItem('token')
        });

        let _that = this;
        this.http.get(url, { headers: headers }).subscribe(function (data) {
            console.log("all graph meta_data");
            console.log(data['_body']);
            _that.graphs = JSON.parse(data['_body']);
        }, function (err) {
            console.dir(err);
        });
    }

    addNewGraph() {
        console.log("add graph:");
        console.log(this.newGraph);

        let url = "http://10.222.174.42:8080/courses/" + this.courseId + "/graphs";
        let body = JSON.stringify(this.newGraph);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.storage.getItem('token')
        });

        let _that = this;
        this.http.post(url, body, { headers: headers }).subscribe(function (data) {
            console.log("new graph meta");
            console.log(data['_body']);
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
        this.modalRef.hide();
        //发送网络请求
        console.log("add questions");

        let url = "http://10.222.174.42:8080/nodes/" + this.curNodeId + "/questions";
        let body = JSON.stringify(this.homeworkContent.newMultichoice);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.storage.getItem('token')
        });

        let _that = this;
        this.http.post(url, body, { headers: headers }).subscribe(function (data) {
            console.dir(data);
            console.log(data['_body']);
        }, function (err) {
            console.dir(err);
        });



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

    //新建课件---------------------------------------
    openLectureModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }
    addLecture() {
        //发送网络请求
        this.modalRef.hide();
        this.uploader.uploadAll();
        // this.uploader.queue[0].onSuccess = (response, status, headers) => {    
        //     // 上传文件成功   
        //     if (status == 200) {
        //         // 上传文件后获取服务器返回的数据
        //         let tempRes = JSON.parse(response);        
        //     }else {            
        //         // 上传文件后获取服务器返回的数据错误        
        //     }
        // };
        // this.uploader.queue[0].upload(); // 开始上传
    }


    fileChanged(event) {
        // let fileList: FileList = event.target.files;
        // if (fileList.length > 0) {
        //     let file: File = fileList[0];
        //     console.log(file);
        //     let formData: FormData = new FormData();
        //     formData.append('uploadFile', file, file.name);

        //     console.dir(file.name);
        //     console.dir(file.size);

        //   let headers = new Headers();
        //   headers.append('Content-Type', 'multipart/form-data');
        //   headers.append('Accept', 'application/json');
        //   let options = new RequestOptions({ headers: headers });
        //   this.http.post('http://localhost:8080/', formData, options)
        //     .map(res => res.json())
        //     .catch(error => Observable.throw(error))
        //     .subscribe(
        //       data => console.log('success'),
        //       error => console.log(error)
        //     )
    }

    fileSelect(): any {
        // console.log(this.fileUploadhe);
        // console.log(this.fileUploadhe.nativeElement);
        // this.fileUploadhe.nativeElement.click();
    }
    fileAllUp(upload): any {
        console.log(upload);
        upload.uploadAll();
    }
    fileAllCancel(): any {
        this.uploader.cancelAll();
    }
    fileAllDelete(): any {
        this.uploader.clearQueue();
    }

    selectedFileOnChanged(event) {
        // 这里是文件选择完成后的操作处理
    }

    buildItemForm(fileItem: FileItem, form: any): any {
        if (!!fileItem["realFileName"]) {
            form.append("fileName", fileItem["realFileName"]);
        }
    }

    afterAddFile(fileItem: FileItem): any {

    }
    changeFileName(value: any, fileItem: FileItem) {
        fileItem["realFileName"] = value.target.value;
    }
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
