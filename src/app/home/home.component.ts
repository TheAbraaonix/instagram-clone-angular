import { Component } from '@angular/core';
import { PublicacoesComponent } from "./publicacoes/publicacoes.component";
import { Autenticacao } from '../services/autenticacao.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PublicacoesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private autenticacao: Autenticacao
  ) {}
  
  public sair(): void {
    this.autenticacao.sair();
  }
}
