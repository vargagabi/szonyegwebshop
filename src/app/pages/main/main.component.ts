import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CommentService} from "../../shared/services/comment.service";
import {ShopComment} from "../../shared/models/comment";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy{

    currentUser: string = '';
    commentArray: Array<ShopComment> = new Array<ShopComment>();

    comment = new FormControl('', [Validators.required, Validators.minLength(2)]);
    userEmail = '';
    subs: any = new Subscription();

    constructor(private commentService: CommentService, private router: Router, private userService: UserService) {
    }

    ngOnInit(): void {
        this.userEmail = JSON.parse(localStorage.getItem('user') as string)['email']
        this.userService.getUserByEmail(this.userEmail).subscribe(user => {
            this.currentUser = user[0].firstName;
        })
        this.subs = this.commentService.read().subscribe((data: Array<ShopComment>)=>{
            this.commentArray = data;
        })
    }
    ngOnDestroy(){
        this.subs.unsubscribe();
    }

    onAddComment() {
        if (this.comment.valid) {

            let comment: ShopComment = {userEmail: this.userEmail, comment: this.comment.value, postDate: new Date().toLocaleString()};
            this.commentService.create(comment).then(r => {

            }).catch(error => {
                console.error(error);
            })
            console.log(comment);
            this.comment.setValue('');

        }
    }

}
