import {Component, OnChanges, OnInit} from '@angular/core';
import {CarpetService} from "../../shared/services/carpet.service";
import {Carpet} from "../../shared/models/carpet";

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

    carpetArray: Array<Carpet> = new Array<Carpet>({height: 0, id: 0, imageUrl: "", name: "", width: 0, price: 0, imageUrlFS: ""});

    constructor(private carpetService: CarpetService) {
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


}
