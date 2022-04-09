import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'szonyegwebshop';

  testoutputevent(variable: string) {
    console.log(variable);
  }
}
