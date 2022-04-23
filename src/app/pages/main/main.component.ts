import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CommentService} from "../../shared/services/comment.service";
import {ShopComment} from "../../shared/models/comment";
import {Subscription} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

    currentUser: string = '';
    commentArray: Array<ShopComment> = new Array<ShopComment>();

    comment = new FormControl('', [Validators.required, Validators.minLength(2)]);
    userEmail = '';
    subs: Array<Subscription> = new Array<Subscription>();

    constructor(private authService: AuthService, private commentService: CommentService, private router: Router, private userService: UserService) {
    }

    ngOnInit(): void {
        if(JSON.parse(localStorage.getItem('user') as string) !== null ){
            console.log(localStorage.getItem('user'));
            this.userEmail = JSON.parse(localStorage.getItem('user') as string)['email'] || null;

            this.subs.push(this.userService.getUserByEmail(this.userEmail).subscribe(user => {
                this.currentUser = user[0].firstName;
            }))
        }


        this.subs.push(this.commentService.read().subscribe((data: Array<ShopComment>) => {
            this.commentArray = data;
        }))
    }

    ngOnDestroy() {
        this.subs.forEach(sub =>{
            sub.unsubscribe();
        });
        this.subs = [];

    }

    onAddComment() {
        if (this.comment.valid) {

            let comment: ShopComment = {
                userEmail: this.userEmail,
                comment: this.comment.value,
                postDate: new Date().toLocaleString()
            };
            this.commentService.create(comment).then(r => {

            }).catch(error => {
                console.error(error);
            })
            console.log(comment);
            this.comment.setValue('');

        }
    }

}
