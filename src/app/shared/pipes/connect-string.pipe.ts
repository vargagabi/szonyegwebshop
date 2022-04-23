import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'connectString'
})
export class ConnectStringPipe implements PipeTransform {


    transform(value: any): any {
        return  "Köszöntelek online üzletemben, " + (value || 'guest') + "!\n" +(value? "Mint regisztrált felhasználó megnézheted az áruimat, és akár a kosaradba is rakhatod őket.\n" :'');
    }

}
