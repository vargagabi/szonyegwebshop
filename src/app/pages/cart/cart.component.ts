import {Component, OnDestroy, OnInit} from '@angular/core';
import {Carpet} from "../../shared/models/carpet";
import {AuthService} from "../../shared/services/auth.service";
import {CartService} from "../../shared/services/cart.service";
import {CarpetService} from "../../shared/services/carpet.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

    carpetArray: Array<Carpet> = new Array<Carpet>({
        height: 0,
        id: 0,
        imageUrl: "",
        name: "",
        width: 0,
        price: 0,
        imageUrlFS: ""
    });
    subs: Subscription = new Subscription();
    constructor(private auth: AuthService,private cartService: CartService,private carpetService: CarpetService) {
    }

    ngOnInit(): void {
        let currentUser = JSON.parse(localStorage.getItem('user') as string)['uid'];
        this.subs = this.cartService.getCartItems(currentUser).subscribe(data => {
            this.carpetArray = data[0].items;
            for (let i = 0; i < this.carpetArray.length; i++) {
                this.carpetService.loadImage(this.carpetArray[i].imageUrl).subscribe(arr => {
                    this.carpetArray[i].imageUrlFS = arr;
                })
            }
        })
    }

    removeButton(obj: Carpet) {
        let currentUser = JSON.parse(localStorage.getItem('user') as string)['uid'];
        this.cartService.deleteCartItem(currentUser,obj);
    }
    ngOnDestroy(){
        this.subs.unsubscribe();
    }
}
