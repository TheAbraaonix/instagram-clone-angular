import { Routes } from '@angular/router';
import { AcessoComponent } from './acesso/acesso.component';
import { HomeComponent } from './home/home.component';
import { AutenticacaoGuard } from './services/autenticacao-guard.service';

export const routes: Routes = [
    { path: "", component: AcessoComponent },
    {path: "home", component: HomeComponent, canActivate: [AutenticacaoGuard]}
];
