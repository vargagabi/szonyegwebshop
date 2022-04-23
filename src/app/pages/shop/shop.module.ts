import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    ShopComponent
  ],
    imports: [
        CommonModule,
        ShopRoutingModule,
        MatCardModule,
        MatButtonModule,
        FlexLayoutModule

    ]
})
export class ShopModule { }
