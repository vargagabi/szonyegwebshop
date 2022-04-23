import {Component, OnInit} from '@angular/core';
import {Carpet} from "../../shared/models/carpet";
import {AuthService} from "../../shared/services/auth.service";
import {CartService} from "../../shared/services/cart.service";
import {CarpetService} from "../../shared/services/carpet.service";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    carpetArray: Array<Carpet> = new Array<Carpet>({
        height: 0,
        id: 0,
        imageUrl: "",
        name: "",
        width: 0,
        price: 0,
        imageUrlFS: ""
    });

    constructor(private auth: AuthService,private cartService: CartService,private carpetService: CarpetService) {
    }

    ngOnInit(): void {
        let currentUser = JSON.parse(localStorage.getItem('user') as string)['uid'];
        this.cartService.getCartItems(currentUser).subscribe(data => {
            this.carpetArray = data[0].items;
            for (let i = 0; i < this.carpetArray.length; i++) {
                this.carpetService.loadImage(this.carpetArray[i].imageUrl).subscribe(arr => {
                    this.carpetArray[i].imageUrlFS = arr;
                })
            }
            console.log(this.carpetArray);
        })
    }

    removeButton(obj: Carpet) {
        let currentUser = JSON.parse(localStorage.getItem('user') as string)['uid'];
        this.cartService.deleteCartItem(currentUser,obj);
    }
}
