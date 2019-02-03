import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    user = {};
    message;
    errors;
    constructor(private _auth: AuthService,
                private router: Router,
                public ngxSmartModalService: NgxSmartModalService) { }

    ngOnInit() {
    }
    register(){
        this._auth.registerUser(this.user)
            .subscribe(
                res => {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('user', JSON.stringify(res.user));
                    this.message = res.message;
                    this.ngxSmartModalService.getModal('myModal').open();
                },
                err => {
                    this.errors = err.error.error;
                    console.log(err)
                }
            )
    }

    closeModal(){
        this.router.navigate(['/user']);
    }
}
