import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

    transform(value: Date): string {
        return value.toLocaleString();

    }

}
