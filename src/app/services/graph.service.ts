import { Injectable } from '@angular/core';
import { MyHttpService } from './MyHttp.service';

@Injectable()
export class GraphService {
    constructor(private myHttp: MyHttpService) { }

    //GET
    listGraphsOfCourse(cid) {
        let url = "courses/" + cid + "/graphs";

        alert(url);

        return this.myHttp.get(url);
    }

    //POST name, description
    addGraphToCourse(cid, newGraph) {
        let url = "/courses/" + cid + "/graphs";
        let body = JSON.stringify(newGraph);

        return this.myHttp.post(url, body);
    }

    //GET
    getGraphData(gid) {
        let url = "/graphs/" + gid + "/jsmind";

        return this.myHttp.get(url);
    }

    //PUT name, description
    updateGraphData(gid, newGraphData) {
        let url = "/graphs/" + gid + "/jsmind";
        let body = JSON.stringify(newGraphData);

        return this.myHttp.put(url, body);
    }

    //DELETE
    delete() {
        let url = '/graphs/{gid}';
    }




}