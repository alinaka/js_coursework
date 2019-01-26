import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    user = {};
    constructor(private _auth: AuthService) { }

    ngOnInit() {
    }
    register(){
        console.log(this.user);
        this._auth.registerUser(this.user)
            .subscribe(
                res => console.log(res),
                err => console.log(err)
            )
    }
}
