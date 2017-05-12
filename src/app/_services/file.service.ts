import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ConstantVariables } from '../_services/constants';
import { header } from '../_helpers/header';

@Injectable()
export class FileService {
    constructor(private http: Http) { }

    postFile(formData) {
        return this.http.post(ConstantVariables.BASE_API_URL+'/file-upload',formData, header.formHead()).map((response: Response) => response.json());
    }


}