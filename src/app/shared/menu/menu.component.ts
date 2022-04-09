import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  currentPage: string;
  loggedIn: boolean;
  @Output() testoutput: EventEmitter<string> = new EventEmitter<string>();


  constructor(private router: Router) {
    this.currentPage = 'main';
    this.loggedIn = false;
  }

  ngOnInit(): void {
  }
  changePage(page: string): void{
      this.testoutput.emit(page);
      this.router.navigateByUrl(page);
      if(page ==='login'){
        this.loggedIn = !this.loggedIn;
      }
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
