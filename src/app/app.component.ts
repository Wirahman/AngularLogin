import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Login';
  email: string | undefined | null;

  constructor(
    private router: Router
  ) { }

  ngOnInit(){
    
  }

  readLocalStorageValue(key: string): string | undefined | null {
      return localStorage.getItem(key);
  }

  menuPengguna(){
    this.router.navigate(['/Pengguna']);
  }

}
