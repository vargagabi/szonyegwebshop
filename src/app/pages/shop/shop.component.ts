import {Component, OnChanges, OnInit} from '@angular/core';
import {CarpetService} from "../../shared/services/carpet.service";
import {Carpet} from "../../shared/models/carpet";
import {MatButton} from "@angular/material/button";
import {CartService} from "../../shared/services/cart.service";
import {AuthService} from "../../shared/services/auth.service";

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

    carpetArray: Array<Carpet> = new Array<Carpet>({height: 0, id: 0, imageUrl: "", name: "", width: 0, price: 0, imageUrlFS: ""});
    selectedItem?: string;

    constructor(private auth: AuthService,private cartService: CartService,private carpetService: CarpetService) {
    }

    ngOnChanges() {
    }

    ngOnInit(): void {
        this.carpetService.loadImageMeta().subscribe((data: Array<Carpet>) => {
            this.carpetArray = data;
            for (let i = 0; i < this.carpetArray.length; i++) {
                this.carpetService.loadImage(this.carpetArray[i].imageUrl).subscribe(arr => {
                    this.carpetArray[i].imageUrlFS = arr;
                })
            }
        })
    }


    addToCart(item: Carpet) {
        let currentUser = (JSON.parse(localStorage.getItem('user') as string)['uid']);
        this.cartService.addToCart(currentUser,item);

        console.log(currentUser);
        console.log(item);
    }
}
