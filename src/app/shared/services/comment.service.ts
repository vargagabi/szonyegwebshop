import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ShopComment} from "../models/comment";

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    collectionName = 'Comments';

    constructor(private afs: AngularFirestore) {
    }

    create(comment: ShopComment){
        return this.afs.collection<ShopComment>(this.collectionName).add(comment);
    }
    read(){
        return this.afs.collection<ShopComment>(this.collectionName).valueChanges();
    }
}
