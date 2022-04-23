import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'connectString'
})
export class ConnectStringPipe implements PipeTransform {


    transform(value: any): any {
        return  "Welcome to my webshop, " + (value || 'guest') + "!\n" +(value? "As a registered user you can view my wares and put them in your cart.\n" :'');
    }

}
