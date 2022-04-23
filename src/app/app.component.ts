import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{
    title = 'szonyegwebshop';
    loggedInUser?: firebase.default.User | null;
    subs: Subscription = new Subscription();
    constructor(private auth: AuthService,private router: Router) {
    }
    ngOnInit(){
        this.subs = this.auth.getLoggedInUser().subscribe(user=>{
            this.loggedInUser = user;
            localStorage.setItem("user",JSON.stringify(this.loggedInUser));
        }, error =>{
            localStorage.setItem("user",JSON.stringify('null'));
            console.error(error);
        });
    }

    ngOnDestroy(){
        this.subs.unsubscribe();
    }

    onLogout(){
        this.auth.logout().then(m=>{
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
