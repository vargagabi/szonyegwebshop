import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartRoutingModule} from './cart-routing.module';
import {CartComponent} from "./cart.component";
import {MatCardModule} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
    declarations: [
        CartComponent
    ],
    imports: [
        CommonModule,
        CartRoutingModule,
        MatCardModule,
        FlexModule,
        MatButtonModule,
    ]
})
export class CartModule {
}
