import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { UserRegister } from '../../interfaces/user';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    FooterComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  hide = true;
  constructor(
    private api: ApiService,
    private router: Router,
    private auth: AuthService,
    private message: MessageService
  ) {}

  userReg: UserRegister = {
    name: '',
    address: '',
    email: '',
    password: '',
    confirm: '',
  };

  register() {
    this.api.registration('users', this.userReg).subscribe((res: any) => {
      if (res.success == true) {
        this.message.showMessage('OK', res.message, 'success');
        this.router.navigate(['/login']);
      } else {
        this.message.showMessage('HIBA', res.message, 'danger');
      }
      this.auth.saveTokenAndLogin(res.token);
    });
  }
}
