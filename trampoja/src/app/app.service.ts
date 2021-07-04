import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {

    public appRoot = 'https://beta.trampoja.com:8088/';
    public url = 'https://beta.trampoja.com:8088';

    constructor(public http: HttpClient) { }

    getService(){
        console.log(":)");
        return this.http.get(this.appRoot);
    }
}