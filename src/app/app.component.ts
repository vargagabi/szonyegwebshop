import {Component, Input, OnChanges} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent{
    title = 'szonyegwebshop';
    loggedInUser?: firebase.default.User | null;

    constructor(private auth: AuthService) {
    }
    ngOnInit(){
        this.auth.getLoggedInUser().subscribe(user=>{
            console.log("Logged in as: " + user?.email);
            this.loggedInUser = user;
            localStorage.setItem("user",JSON.stringify(this.loggedInUser));
        }, error =>{
            localStorage.setItem("user",JSON.stringify('null'));
            console.error(error);
        });
    }


}
