import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { UserLogin, UserRegister } from '../../interfaces/user';
import { ApiService } from '../../services/api.service';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatTabsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, CommonModule, FormsModule, NavbarComponent,FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  constructor
  (
    private api: ApiService,
    private router: Router,
    private auth: AuthService,
    private message: MessageService
  ) {}


  user:UserLogin = {
    email: '',
    password: ''
  }

  userReg:UserRegister = {
    name: '',
    address: '',
    email: '',
    password: '',
    confirm: ''
  }

  login() {
    this.api.login('users', this.user).subscribe((res:any) => {

      if(res.success == true) {

        this.message.showMessage('OK', res.message, 'success');
      }else{

        this.message.showMessage('HIBA', res.message, 'danger');
      }
      this.auth.saveTokenAndLogin(res.token)
      this.router.navigate(['/hirdetes'])
    })
  }

 


}
