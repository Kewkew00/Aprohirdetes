import { RouterModule, Routes } from '@angular/router';
import { HirdetesComponent } from './components/hirdetes/hirdetes.component';
import { LoginComponent } from './components/login/login.component';
    {
        path: 'hirdetes', component: HirdetesComponent 
    },

    {
        path: '', redirectTo:'login', pathMatch:'full'
    }
];

