import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Imagem } from './imagem.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [NgFor],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('2s ease-in')),
    ])
  ]
})
export class BannerComponent implements OnInit {
  public estado: string = 'escondido';
  public imagens: Imagem[] = [
    { estado: 'visivel', url: '/banner-acesso/img_1.png' },
    { estado: 'escondido', url: '/banner-acesso/img_2.png' },
    { estado: 'escondido', url: '/banner-acesso/img_3.png' },
    { estado: 'escondido', url: '/banner-acesso/img_4.png' },
    { estado: 'escondido', url: '/banner-acesso/img_5.png' }
  ];
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.logicaRotacao(), 3000);
  }

  public logicaRotacao(): void {
    //auxiliar na exibição da imagem seguinte
    let idx: number = 0;
    
    //ocultar imagem
    for(let i: number = 0; i <= this.imagens.length - 1; i++) {
      
      if(this.imagens[i].estado === 'visivel') {
        this.imagens[i].estado = 'escondido';
        
        idx = i === this.imagens.length - 1 ? 0 : i + 1;
        break;
      }
    }

    this.imagens[idx].estado = 'visivel';
    setTimeout(() => this.logicaRotacao(), 3000);
  }
}
