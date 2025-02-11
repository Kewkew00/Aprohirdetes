import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { HirdetesComponent } from '../hirdetes/hirdetes.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatTabsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  constructor(private router: Router) {}

  navigateToHirdetes(): void {
    this.router.navigate(['/hirdetes']);
  }
}
