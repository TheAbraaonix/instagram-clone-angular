import { Component } from '@angular/core';
import { BannerComponent } from "./banner/banner.component";
import { LoginComponent } from "./login/login.component";
import { animate, state, style, transition, trigger, keyframes } from '@angular/animations';
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
        animate('1500ms 0s ease-in-out', keyframes([
          style({offset: 0.15, opacity: 1, transform: 'translateX(0)'}),
          style({offset: 0.86, opacity: 1, transform: 'translateX(0)'}),

          style({offset: 0.88, opacity: 1, transform: 'translateY(-10px)'}),          
          style({offset: 0.90, opacity: 1, transform: 'translateY(10px)'}),
          style({offset: 0.92, opacity: 1, transform: 'translateY(-10px)'}),
          style({offset: 0.94, opacity: 1, transform: 'translateY(10px)'}),
          style({offset: 0.96, opacity: 1, transform: 'translateY(-10px)'}),
          style({offset: 0.98, opacity: 1, transform: 'translateY(10px)'}),

          style({offset: 1, opacity: 1, transform: 'translateY(0)'})
        ]))
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

  public inicioDaAnimacao(): void {
    //console.log('Inicio da animação');
  }

  public fimDaAnimacao(): void {
    //console.log('Fim da animação');
  }
}
