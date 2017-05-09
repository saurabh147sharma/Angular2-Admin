"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getAll = function () {
        return this.http.post('http://localhost/pseudowinners-web/public/users', {}, this.head()).map(function (response) { return response.json(); });
    };
    UserService.prototype.getById = function (id) {
        return this.http.get('/api/users/' + id, this.head()).map(function (response) { return response.json(); });
    };
    UserService.prototype.create = function (user) {
        return this.http.post('http://localhost/pseudowinners-web/public/register', user, this.head()).map(function (response) { return response.json(); });
    };
    UserService.prototype.update = function (user) {
        return this.http.put('/api/users/' + user.id, user, this.head()).map(function (response) { return response.json(); });
    };
    UserService.prototype.delete = function (id) {
        return this.http.post('http://localhost/pseudowinners-web/public/delete', { "userId": id }, this.head()).map(function (response) { return response.json(); });
    };
    UserService.prototype.logout = function () {
        return this.http.post('http://localhost/pseudowinners-web/public/app-logout', {}, this.head())
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            if (user && user.success == 1) {
                // remove user from local storage to log user out
                localStorage.removeItem('currentUser');
            }
        });
    };
    // private helper methods
    UserService.prototype.head = function () {
        // create authorization header with token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var headers = new http_1.Headers();
        if (currentUser && currentUser.result.userDetails.access_token) {
            headers.append('authToken', currentUser.result.userDetails.access_token);
        }
        headers.append('Content-Type', 'application/json');
        return new http_1.RequestOptions({ headers: headers });
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map