import { AfterViewInit, Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import {MatTabGroup, MatTabsModule} from '@angular/material/tabs';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatTabsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit{
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

  @ViewChild('.tabGroup') tabGroup!: MatTabGroup;

  ngAfterViewInit(): void {
    console.log(this.tabGroup)
  }

  navigateToLoginTab(){
    this.tabGroup.selectedIndex = 0
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

  register() {
    if (this.userReg.password!=this.userReg.confirm) {
      console.log('A jelszavak nem egyeznek')
      return;
    }
    else{
      this.api.registration('users', this.userReg).subscribe((res:any) => {

        if(res.success == true) {
  
          this.message.showMessage('OK', res.message, 'success');
        }else{
  
          this.message.showMessage('HIBA', res.message, 'danger');
        }
        this.auth.saveTokenAndLogin(res.token);
        this.router.navigate(['/']);
        this.navigateToLoginTab();
      })
    }
  }
}
