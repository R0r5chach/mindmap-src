import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  lectures = [
    {
      "rid": 78,
      "title": "第一课",
      "description": "这是高级web第一次课的课件"
    },
    {
      "rid": 8,
      "title": "第二课",
      "description": "这是高级web第二次课的课件"
    },
    {
      "rid": 908,
      "title": "第三课",
      "description": "这是高级web第三次课的课件"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
