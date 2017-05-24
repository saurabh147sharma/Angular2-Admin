import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConstantVariables } from '../_services/constants';
import { header } from '../_helpers/header';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll(first_name : string = null,page : number = 1) {
        return this.http.post(ConstantVariables.BASE_API_URL+'/users',{first_name:first_name,page:page}, header.head()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, header.head()).map((response: Response) => response.json());
    }

    userDetailsById(user_id: User) {
        return this.http.post(ConstantVariables.BASE_API_URL+'/user-details',JSON.stringify({ userId: user_id }), header.head()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(ConstantVariables.BASE_API_URL+'/register', user, header.head()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.post(ConstantVariables.BASE_API_URL+'/update-user', user, header.head()).map((response: Response) => response.json());
    }

    updateUserData(user: User) {
        return this.http.post(ConstantVariables.BASE_API_URL+'/update-user-data', user, header.head()).map((response: Response) => response.json());
    }


    delete(id: number) {
        return this.http.post(ConstantVariables.BASE_API_URL+'/delete', {"userId": id}, header.head()).map((response: Response) => response.json());
    }

     logout() {
        return this.http.post(ConstantVariables.BASE_API_URL+'/app-logout', {}, header.head())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.success==1) {
                       // remove user from local storage to log user out
                localStorage.removeItem('currentUser');
                }
            });
    
    }

}