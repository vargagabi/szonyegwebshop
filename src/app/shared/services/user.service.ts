import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    collectionName = 'Users';

    constructor(private afs: AngularFirestore) {
    }

    //CRUD muveletek az User-nek
    create(user: User){
        return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
    }
    getAll(){
        return this.afs.collection<User>(this.collectionName).valueChanges();
    }
    update(){

    }

    getUserByEmail(email: string | null | undefined){
        return this.afs.collection<User>(this.collectionName, ref =>ref.where('email','==',email)).valueChanges()
    }
}
