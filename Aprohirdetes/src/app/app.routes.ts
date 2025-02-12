import { RouterModule, Routes } from '@angular/router';
import { HirdetesComponent } from './components/hirdetes/hirdetes.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: "", redirectTo: "login", pathMatch: "full"
    },
    {
        path: "login", component: LoginComponent
    },
    {
        path: 'hirdetes', component: HirdetesComponent 
    }
];

