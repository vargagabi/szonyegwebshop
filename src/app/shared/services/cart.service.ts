import {Injectable} from '@angular/core';
import {Cart} from "../models/cart";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Carpet} from "../models/carpet";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    collectionName = "Carts";

    constructor(private afs: AngularFirestore) {
    }

    create(cart: Cart){
        return this.afs.collection<Cart>(this.collectionName).add(cart);
    }
    initCart(userId: string){
        return this.afs.collection<Cart>(this.collectionName).doc(userId).set({items: [], id: userId});
    }
    addToCart(user: string, item: Carpet){
        let subs = this.afs.collection<Cart>(this.collectionName,ref=>ref.where('id','==',user)).valueChanges().subscribe(data=>{
            let cart = data[0] as Cart;
            cart.items.push(item);
            this.afs.collection<Cart>(this.collectionName).doc(user).set(cart);
            subs.unsubscribe();
            return;
        })
    }
    getCartItems(user:string){
        return this.afs.collection<Cart>(this.collectionName,ref=>ref.where('id','==',user)).valueChanges();
    }
    deleteCartItem(user:string, item: Carpet){
        let subs = this.afs.collection<Cart>(this.collectionName,ref=>ref.where('id','==',user)).valueChanges().subscribe(data=>{
            let cart = data[0] as Cart;
            cart.items.splice(cart.items.indexOf(item),1);
            this.afs.collection<Cart>(this.collectionName).doc(user).set(cart);
            subs.unsubscribe();
            return;
        })
    }

}
