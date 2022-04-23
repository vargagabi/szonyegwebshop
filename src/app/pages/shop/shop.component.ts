import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {CarpetService} from "../../shared/services/carpet.service";
import {Carpet} from "../../shared/models/carpet";
import {MatButton} from "@angular/material/button";
import {CartService} from "../../shared/services/cart.service";
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit,OnDestroy {

    carpetArray: Array<Carpet> = new Array<Carpet>({height: 0, id: 0, imageUrl: "", name: "", width: 0, price: 0, imageUrlFS: ""});
    subs: Subscription = new Subscription();
    constructor(private auth: AuthService,private cartService: CartService,private carpetService: CarpetService) {
    }

    ngOnChanges() {
    }

    ngOnInit(): void {
        this.subs = this.carpetService.loadImageMeta().subscribe((data: Array<Carpet>) => {
            this.carpetArray = data;
            for (let i = 0; i < this.carpetArray.length; i++) {
                this.carpetService.loadImage(this.carpetArray[i].imageUrl).subscribe(arr => {
                    this.carpetArray[i].imageUrlFS = arr;
                })
            }
        })
    }

    ngOnDestroy(){
        this.subs.unsubscribe();
    }

    addToCart(item: Carpet) {
        let currentUser = (JSON.parse(localStorage.getItem('user') as string)['uid']);
        this.cartService.addToCart(currentUser,item);
    }
}
