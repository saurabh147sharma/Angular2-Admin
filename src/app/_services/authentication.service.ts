import { Injectable, Component } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConstantVariables } from '../_services/constants';
import { header } from '../_helpers/header';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
return this.http.post(ConstantVariables.BASE_API_URL+'/login-app',JSON.stringify({ username: username, password: password, role_type: 2, device_type: 2 }), header.head()).map((response: Response) => response.json());


    }


}