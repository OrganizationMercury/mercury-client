import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrl: './account-sidebar.component.css'
})
export class AccountSidebarComponent {
  headerButtonIcon = 'assets/arrow-left.svg';

  constructor(private router: Router) {
    
  }

  toMainSidebar = () => {
    this.router.navigateByUrl('home');
  }

  navigateBack = () => {
    let path = this.router.url.split('/');
    if (path.includes('info')) 
      this.router.navigate(['home/account/update']);
    else if (path.includes('update')) 
      this.router.navigate(['home/account/info']);
  }

  logout() {
    this.router.navigateByUrl('login');
  }
}
