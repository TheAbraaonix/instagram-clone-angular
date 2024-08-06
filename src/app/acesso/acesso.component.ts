import { Component } from '@angular/core';
import { BannerComponent } from "./banner/banner.component";
import { LoginComponent } from "./login/login.component";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CadastroComponent } from "./cadastro/cadastro.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-acesso',
  standalone: true,
  imports: [BannerComponent, LoginComponent, CadastroComponent, NgIf],
  templateUrl: './acesso.component.html',
  styleUrl: './acesso.component.css',
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(-50px, 0px)' }),
        animate('500ms 0s ease-in-out')])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(50px, 0px)' }),
        animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class AcessoComponent {
  public estadoBanner: string = 'criado';
  public estadoPainel: string = 'criado';
  public cadastro: boolean = false;

  exibirPainel(event: string): void {
    this.cadastro = event === 'cadastro' ? true : false;
  }
}
