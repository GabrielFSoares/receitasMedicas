import { Component } from '@angular/core';
import { faSignOutAlt, faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  faSignOut = faSignOutAlt
  faDownload = faDownload

  nome:String = "Gabriel"

  constructor() {}

}
