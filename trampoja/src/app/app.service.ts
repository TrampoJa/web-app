import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {

    public appRoot = 'http://localhost:8000/';
    public url = 'http://localhost:8000';

    constructor(public http: HttpClient) { }

    getService(){
        console.log(":)");
        return this.http.get(this.appRoot);
    }
}