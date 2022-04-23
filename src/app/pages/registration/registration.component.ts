import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Location} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../shared/models/user";
import {UserService} from "../../shared/services/user.service";
import {CartService} from "../../shared/services/cart.service";

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


    constructor(private cartService: CartService,private router: Router, private auth: AuthService, private location: Location,private userService: UserService) {
    }

    ngOnInit(): void {
    }

    onSubmit() {
        if (this.registerForm.valid && this.registerForm.value.password === this.registerForm.value.passwordRepeat) {
                this.auth.register(this.registerForm.value.email, this.registerForm.value.password)
                    .then(cred => {
                        alert("Sikeres regisztracio, kerlek jelentkezz be!");
                        console.log("Sikeres regisztracio");
                        const user: User = {
                            id: cred.user?.uid as string,
                            lastName: this.registerForm.value.lastName,
                            firstName: this.registerForm.value.firstName,
                            email: this.registerForm.value.email,
                            phoneNumber: this.registerForm.value.phoneNumber
                        }
                        this.userService.create(user).then(_ =>{
                            console.log('User added succesfully: ' + user.email);
                        }).catch(error =>{
                            console.error(error);
                        });
                        this.cartService.initCart(user.id).then(_=>{
                            console.log("cart added");
                        })
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
