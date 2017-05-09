import { Headers, RequestOptions, Response } from '@angular/http';
export const header = Object.freeze({
     // private helper methods

     head() {
        // create authorization header with token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers();
        if (currentUser && currentUser.result.userDetails.access_token) {
            headers.append('authToken', currentUser.result.userDetails.access_token );
        }
        headers.append('Content-Type', 'application/json');
         return new RequestOptions({ headers: headers });
    }
 });