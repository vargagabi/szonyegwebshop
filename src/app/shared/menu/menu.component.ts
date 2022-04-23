import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    @Input() loggedIn: boolean;
    @Output() onCloseSideNav: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private router: Router, private auth: AuthService) {
        this.loggedIn = false;
    }

    ngOnInit(): void {

    }

    onLogout(){
        this.auth.logout().then(m=>{
            this.router.navigateByUrl("/login");
        }).catch(error=>{
            console.error(error);
        });
    }

}
