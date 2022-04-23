import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from "./main.component";
import {ConnectStringPipe} from "../../shared/pipes/connect-string.pipe";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        MainComponent,
        ConnectStringPipe,
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        FlexLayoutModule,
        ReactiveFormsModule
    ]
})
export class MainModule {
}
