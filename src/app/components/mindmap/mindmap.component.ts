
import { Component, OnInit, Input, ViewChildren, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

// 引入jsmind.js文件
import * as jsMind from '../../jsmind/js/jsmind.js';
import '../../jsmind/js/jsmind.screenshot.js';
import '../../jsmind/js/jsmind.draggable.js';
// jsMind的设置参数
const options = {
  container: 'jsmind_container',
  theme: 'greensea',
  editable: true
}
// 思维导图Mindmap渲染的json文件
let graghDates:{[key: string]: object;} = {};
let currentGraphID;
let mind = {
  "meta": {
    "name": "jsMind remote",
    "author": "hizzgdev@163.com",
    "version": "0.2"
  },
  "format": "node_tree",
  "data": {
    "id": "root", "topic": "jsMind", "children": [
      {
        "id": "easy", "topic": "Easy", "direction": "left", "children": [
          { "id": "easy1", "topic": "Easy to show" },
          { "id": "easy2", "topic": "Easy to edit" },
          { "id": "easy3", "topic": "Easy to store" },
          { "id": "easy4", "topic": "Easy to embed" }
        ]
      },
      {
        "id": "open", "topic": "Open Source", "direction": "right", "children": [
          { "id": "open1", "topic": "on GitHub", "background‐color": "#eee", "foreground‐color": "blue" },
          { "id": "open2", "topic": "BSD License" }
        ]
      },
      {
        "id": "powerful", "topic": "Powerful", "direction": "right", "children": [
          { "id": "powerful1", "topic": "Base on Javascript" },
          { "id": "powerful2", "topic": "Base on HTML5" },
          { "id": "powerful3", "topic": "Depends on you" }
        ]
      },
      {
        "id": "other", "topic": "test node", "direction": "left", "children": [
          { "id": "other1", "topic": "I'm from local variable" },
          { "id": "other2", "topic": "I can do everything" }
        ]
      }
    ]
  }
}


@Component({
  selector: 'app-mindmap',
  templateUrl: './mindmap.component.html',
  styleUrls: ['./mindmap.component.css']
})

export class MindmapComponent implements OnInit {
  @Input() currentId = -1;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  public title = 'mindmap';
  // mindMap;
  public jm;
  public fgColor = "#ffffff";
  public bgColor = "#000000";

  //初始化
  ngOnInit() {
    this.jm = new jsMind(options); 
  }

  //移除节点
  removeNode() {
    const selected_id = this.jm.get_selected_node();
    if (!selected_id) {
      console.log('please select a node first.');
      return;
    }
    this.jm.remove_node(selected_id);
  }

  //增加节点
  addNode() {
    const selected_node = this.jm.get_selected_node(); // as parent of new node
    if (!selected_node) {
      console.log('please select a node first.');
      return;
    }
    const nodeid = jsMind.util.uuid.newid();
    const topic = '* Node_' + nodeid.substr(0, 5) + ' *';
    const node = this.jm.add_node(selected_node, nodeid, topic);
  }

  //打印图片
  prtScn() {
    this.jm.screenshot.shootDownload();
  }

  //创建思维导图
  createGraph(id) {
    currentGraphID = id;
    console.log("create");
    const newmindda = {
      "meta": {
        "name": "jsMind remote",
        "author": "hizzgdev@163.com",
        "version": "0.2"
      },
      "format": "node_tree",
      "data": {
        "id": "root", "topic": "根目录", "children": []
      }
    };
    graghDates[id] = newmindda;
    this.jm.show(newmindda);
  }

  //改变节点背景颜色
  changeColor() {
    // console.log(this.color);
    const select_node = this.jm.get_selected_node();
    if(null == select_node) {
      return;
    }
    this.jm.set_node_color(select_node.id, this.bgColor, null);
  }

  //改变字体颜色
  changeFontColor() {
    // console.log(this.color);
    const select_node = this.jm.get_selected_node();
    if(null == select_node) {
      return;
    }
    this.jm.set_node_color(select_node.id, null, this.fgColor);
  }

  //查看节点是否被选中
  checkStatus() {
    const select_node = this.jm.get_selected_node();
    if(null == select_node) {
      this.currentId = null;
      console.log("nothing");
    } else {
      this.currentId = select_node.id;
      console.log(select_node.id);
    }
    this.change.emit(this.currentId);
  }

  //保存思维导图
  save() {
    const data = jsMind.format.node_tree.get_data(this.jm.mind);
    graghDates[currentGraphID] = data;
    console.log(data);
    // 将data发送至后台
  }

  //根据graphID切换思维导图
  getData(graphId) {
    currentGraphID = graphId;
    if(graghDates[graphId] == null){
      let data = {
        "meta": {
          "name": "jsMind remote",
          "author": "hizzgdev@163.com",
          "version": "0.2"
        },
        "format": "node_tree",
        "data": {
          "id": "root", "topic": "根目录", "children": []
        }
      };
      data.data.topic = graphId;
      graghDates[graphId] = data;
      this.jm.show(data);
    } else{
      this.jm.show(graghDates[graphId]);
    }
  }
}

