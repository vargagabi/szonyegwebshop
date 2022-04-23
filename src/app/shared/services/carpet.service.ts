import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Carpet} from "../models/carpet";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {take} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CarpetService {

    collectionName: string = 'Carpets';

    constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    }
    //adatbazisbol lekerdezes

    loadImageMeta(){
        return this.afs.collection<Carpet>(this.collectionName).valueChanges();
    }
    loadImage(imageUrl: string){
        return this.storage.ref(imageUrl).getDownloadURL().pipe(take(1));
    }

}
