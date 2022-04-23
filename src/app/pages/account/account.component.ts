import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

    subs: Subscription = new Subscription();
    currentUser: User;
    constructor(private userService: UserService, private authService: AuthService, private router: Router) {
        this.currentUser = {id:'',firstName:'',lastName:'',email:'',phoneNumber:''};
    }

    ngOnInit(): void {
        this.subs = this.authService.getLoggedInUser().subscribe(user=>{
            this.userService.getUserByEmail(user?.email).subscribe(data=>{
                this.currentUser = data[0];
            })
        })

    }
    ngOnDestroy(){
        this.subs.unsubscribe();
    }

}
