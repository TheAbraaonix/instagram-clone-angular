import { Component } from '@angular/core';
import { BannerComponent } from "./banner/banner.component";
import { LoginComponent } from "./login/login.component";
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  standalone: true,
  imports: [BannerComponent, LoginComponent],
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
}
