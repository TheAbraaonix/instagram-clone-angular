import { Component, ViewChild } from '@angular/core';
import { PublicacoesComponent } from "./publicacoes/publicacoes.component";
import { Autenticacao } from '../services/autenticacao.service';
import { IncluirPublicacaoComponent } from "./incluir-publicacao/incluir-publicacao.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PublicacoesComponent, IncluirPublicacaoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('publicacoes') public publicacoes: any;
  
  constructor(
    private autenticacao: Autenticacao
  ) {}
  
  public sair(): void {
    this.autenticacao.sair();
  }

  public atualizarTimeLine(): void {
    this.publicacoes.atualizarTimeLine();
  }
}
