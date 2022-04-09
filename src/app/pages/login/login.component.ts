import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    })

    constructor(private location: Location, private router: Router) {
    }

    ngOnInit(): void {
    }

    //bejelentkezes kezelese
    onSubmit(): void {
        //TODO: firebase bejelentkezes

    }

    onCancel(): void {
        this.location.back();
    }
}
