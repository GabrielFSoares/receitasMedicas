import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public router:Router) {
    let login = localStorage.getItem("login")

    if(login == "1") {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }

    
  }
}
