
import { Component, OnInit, ViewChildren } from '@angular/core';
// 引入jsmind.js文件
import * as jsMind from '../../jsmind/js/jsmind.js';
// jsMind的设置参数
const options = {
  container: 'jsmind_container',
  theme: 'greensea',
  editable: true
}
// 思维导图Mindmap渲染的json文件
const mind = {
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
  title = 'mindmap';
  mindMap;

  //初始化
  ngOnInit() {
    this.mindMap = jsMind.show(options, mind);
    this.initNav();
  }

  initNav(){
    //angular：DOM解析+JSON解析
    var item= JSON.parse(mind);

    //获取side-list目录
    var node_list = document.getElementById("side-list");
    console.log(node_list.attributes);
        
    //遍历mind，在side-list目录下生成对应的子节点
    var todoList = [];


    var root;
    root = document.createElement("li");
    root.id = mind.data.topic;
    
    node_list.appendChild(root);

    todoList.push(root);

    //
    var parent;
    var child;
    while((parent = todoList.pop()) != null){
      //解析json中parent的children列表
      /*for each child：
        生成对应节点，绑定在父节点之后
        将当前节点push进todoList；
       */
    }

  }

  //移除节点
  removeNode() {
    const selected_id = this.mindMap.get_selected_node();
    if (!selected_id) {
      console.log('please select a node first.');
      return;
    }
    this.mindMap.remove_node(selected_id);
  }

  //增加节点
  addNode() {
    const selected_node = this.mindMap.get_selected_node(); // as parent of new node
    if (!selected_node) {
      console.log('please select a node first.');
      return;
    }
    const nodeid = jsMind.util.uuid.newid();
    const topic = '* Node_' + nodeid.substr(0, 5) + ' *';
    const node = this.mindMap.add_node(selected_node, nodeid, topic);
  }
}

