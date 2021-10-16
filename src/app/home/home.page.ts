import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  faSignOut = faSignOutAlt

  nome:String = "Gabriel"

  constructor(public router:Router) {}

  logout() {
    this.router.navigate(['/login'])
    localStorage.setItem("login", '0')
    localStorage.removeItem("token")
  }

}
