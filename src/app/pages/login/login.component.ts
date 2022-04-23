import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.minLength(1), Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(1)])
    })

    constructor(private location: Location, private router: Router, private auth: AuthService) {
    }

    ngOnInit(): void {
    }

    //bejelentkezes kezelese
    onSubmit(): void {
        if (this.loginForm.valid) {
            this.auth.login(this.loginForm.value.email, this.loginForm.value.password)
                .then(cred => {
                    this.router.navigateByUrl("/main");
                })
                .catch(error => {
                    console.error(error);
                })
                .finally();
        }else{
            alert("Sikertelen bejelentkezes.");
        }
    }

    onCancel(): void {
        this.location.back();
    }
}
