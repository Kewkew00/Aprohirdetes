import { RouterModule, Routes } from '@angular/router';
import { HirdetesComponent } from './components/hirdetes/hirdetes.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    {
        path: 'login', component:LoginComponent
    },

    {
        path: 'register', component:RegisterComponent
    },

    {
        path: 'hirdetes', component: HirdetesComponent 
    },

    {
        path: '', redirectTo:'login', pathMatch:'full'
    }
];

