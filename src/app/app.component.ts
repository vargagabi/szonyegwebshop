import {Component, Input, OnChanges} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent{
    title = 'szonyegwebshop';
    loggedInUser?: firebase.default.User | null;
    constructor(private auth: AuthService,private router: Router) {
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


    onLogout(){
        this.auth.logout().then(m=>{
            console.log("Successful logout");
            this.router.navigateByUrl("/login");
        }).catch(error=>{
            console.error(error);
        });
    }

    onSidenav(sidenav: MatSidenav) {
        sidenav.toggle();
    }

    closeSideNav(event: any, sidenav: MatSidenav) {
        if(event === true){
            sidenav.close();
        }

    }
}
