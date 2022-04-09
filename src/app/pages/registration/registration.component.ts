import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Location} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../shared/models/user";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    registerForm: FormGroup = new FormGroup({
        lastName: new FormControl('', [Validators.required, Validators.minLength(1)]),
        firstName: new FormControl('', [Validators.required, Validators.minLength(1)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phoneNumber: new FormControl('', [Validators.required, Validators.minLength(7)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        passwordRepeat: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })


    constructor(private router: Router, private auth: AuthService, private location: Location) {
    }

    ngOnInit(): void {
    }

    onSubmit() {
        //TODO sikeres bejelentkezes eseten uj oldal ahol koszontjuk a felhasznalot -> @input hasznalata :D
        if (this.registerForm.valid && this.registerForm.value.password === this.registerForm.value.passwordRepeat) {
                this.auth.register(this.registerForm.value.email, this.registerForm.value.password)
                    .then(r => {
                        alert("Sikeres regisztracio, kerlek jelentkezz be!");
                        console.log("Sikeres regisztracio");
                        this.router.navigateByUrl("/login");
                    })
                    .catch(error => {
                        alert(error);
                        console.error(error);
                    });
        }else{
            alert("Hiba!\nMinden mezo kitoltese kotelezo!\nA jelszavaknak meg kell egyeznie.\nA telefonszam legalabb 7 szamjegy legyen.");
        }
    }

    onCancel() {
        this.location.back();
    }
}
