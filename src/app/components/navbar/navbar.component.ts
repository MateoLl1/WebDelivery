import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private route: Router) {}

  navegarDashboard() {
    this.route.navigateByUrl('dashboard');
  }

  navegarRegistroEm() {
    this.route.navigateByUrl('registroEm');
  }
}
