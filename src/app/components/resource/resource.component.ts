import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  resources = [
    {
      "type": "FILE",
      "rid": 78,
      "name": "第一课",
      "description": "这是高级web第一次课的课件"
    },
    {
      "type": "LINK",
      "rid": 8,
      "link": "http://www.baidu.com",
      "name": "第二课",
      "description": "这是高级web第二次课的课件"
    },
    {
      "type": "FILE",
      "rid": 908,
      "name": "第三课",
      "description": "这是高级web第三次课的课件"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
